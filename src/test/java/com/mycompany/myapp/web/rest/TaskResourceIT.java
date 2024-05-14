package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.TaskAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.repository.TaskRepository;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link TaskResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tasks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MockMvc restTaskMockMvc;

    private Task task;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createEntity() {
        Task task = new Task().title(DEFAULT_TITLE).description(DEFAULT_DESCRIPTION);
        return task;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task createUpdatedEntity() {
        Task task = new Task().title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);
        return task;
    }

    @BeforeEach
    public void initTest() {
        taskRepository.deleteAll();
        task = createEntity();
    }

    @Test
    void createTask() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Task
        var returnedTask = om.readValue(
            restTaskMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(task)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Task.class
        );

        // Validate the Task in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertTaskUpdatableFieldsEquals(returnedTask, getPersistedTask(returnedTask));
    }

    @Test
    void createTaskWithExistingId() throws Exception {
        // Create the Task with an existing ID
        task.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllTasks() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        // Get all the taskList
        restTaskMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    void getTask() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        // Get the task
        restTaskMockMvc
            .perform(get(ENTITY_API_URL_ID, task.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    void getNonExistingTask() throws Exception {
        // Get the task
        restTaskMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingTask() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task
        Task updatedTask = taskRepository.findById(task.getId()).orElseThrow();
        updatedTask.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

        restTaskMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedTask))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTaskToMatchAllProperties(updatedTask);
    }

    @Test
    void putNonExistingTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(put(ENTITY_API_URL_ID, task.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(task))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(task)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task using partial update
        Task partialUpdatedTask = new Task();
        partialUpdatedTask.setId(task.getId());

        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTask))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTaskUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedTask, task), getPersistedTask(task));
    }

    @Test
    void fullUpdateTaskWithPatch() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the task using partial update
        Task partialUpdatedTask = new Task();
        partialUpdatedTask.setId(task.getId());

        partialUpdatedTask.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTask))
            )
            .andExpect(status().isOk());

        // Validate the Task in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTaskUpdatableFieldsEquals(partialUpdatedTask, getPersistedTask(partialUpdatedTask));
    }

    @Test
    void patchNonExistingTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(patch(ENTITY_API_URL_ID, task.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(task)))
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(task))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTask() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        task.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(task)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTask() throws Exception {
        // Initialize the database
        taskRepository.save(task);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the task
        restTaskMockMvc
            .perform(delete(ENTITY_API_URL_ID, task.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return taskRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Task getPersistedTask(Task task) {
        return taskRepository.findById(task.getId()).orElseThrow();
    }

    protected void assertPersistedTaskToMatchAllProperties(Task expectedTask) {
        assertTaskAllPropertiesEquals(expectedTask, getPersistedTask(expectedTask));
    }

    protected void assertPersistedTaskToMatchUpdatableProperties(Task expectedTask) {
        assertTaskAllUpdatablePropertiesEquals(expectedTask, getPersistedTask(expectedTask));
    }
}
