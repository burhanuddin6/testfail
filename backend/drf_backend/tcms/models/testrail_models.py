# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class TestrailAnnouncements(models.Model):
    title = models.CharField(max_length=250)
    start_date = models.IntegerField(blank=True, null=True)
    end_date = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    view = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'announcements'


class TestrailAttachments(models.Model):
    name = models.CharField(max_length=250)
    filename = models.CharField(max_length=250)
    size = models.IntegerField()
    created_on = models.IntegerField()
    project_id = models.IntegerField(blank=True, null=True)
    case_id = models.IntegerField(blank=True, null=True)
    test_change_id = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'attachments'


class TestrailAuditLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    entity_id = models.BigIntegerField()
    entity_type = models.IntegerField()
    action_type = models.IntegerField()
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    mode = models.IntegerField(blank=True, null=True)
    entity_name = models.CharField(max_length=256, blank=True, null=True)
    project_name = models.CharField(max_length=256, blank=True, null=True)
    uuid_entity_id = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'audit_log'


class TestrailAuditLogExports(models.Model):
    status = models.IntegerField(blank=True, null=True)
    created_on = models.IntegerField()
    filename = models.CharField(max_length=250)
    size = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'audit_log_exports'


class TestrailBanners(models.Model):
    banner_id = models.PositiveIntegerField()
    content = models.TextField()
    start_date = models.IntegerField(blank=True, null=True)
    end_date = models.IntegerField(blank=True, null=True)
    last_reset_cookie_date = models.IntegerField(blank=True, null=True)
    force_reset_cookie = models.IntegerField(blank=True, null=True)
    active = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banners'


class TestrailCaseAssocs(models.Model):
    case_id = models.IntegerField()
    name = models.CharField(max_length=250)
    value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'case_assocs'


class TestrailCaseChanges(models.Model):
    case_id = models.IntegerField()
    type_id = models.IntegerField()
    created_on = models.IntegerField()
    user_id = models.IntegerField()
    changes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'case_changes'


class TestrailCaseComments(models.Model):
    case_id = models.IntegerField()
    change_id = models.IntegerField()
    user_id = models.IntegerField()
    created_on = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'case_comments'


class TestrailCaseStatuses(models.Model):
    name = models.CharField(max_length=250)
    short_name = models.CharField(max_length=100, blank=True, null=True)
    display_order = models.IntegerField()
    is_system = models.IntegerField()
    is_approved = models.IntegerField()
    is_default = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'case_statuses'


class TestrailCaseTypes(models.Model):
    name = models.CharField(max_length=250)
    is_default = models.IntegerField()
    is_deleted = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'case_types'


class TestrailCases(models.Model):
    section_id = models.IntegerField()
    title = models.CharField(max_length=250)
    display_order = models.IntegerField()
    priority_id = models.IntegerField()
    estimate = models.IntegerField(blank=True, null=True)
    milestone_id = models.IntegerField(blank=True, null=True)
    custom_preconds = models.TextField(blank=True, null=True)
    custom_steps = models.TextField(blank=True, null=True)
    custom_expected = models.TextField(blank=True, null=True)
    custom_steps_separated = models.TextField(blank=True, null=True)
    custom_mission = models.TextField(blank=True, null=True)
    custom_goals = models.TextField(blank=True, null=True)
    custom_automation_type = models.IntegerField(blank=True, null=True)
    type_id = models.IntegerField()
    is_copy = models.IntegerField()
    copyof_id = models.IntegerField(blank=True, null=True)
    created_on = models.IntegerField()
    user_id = models.IntegerField()
    estimate_forecast = models.IntegerField(blank=True, null=True)
    refs = models.CharField(max_length=250, blank=True, null=True)
    suite_id = models.IntegerField()
    updated_on = models.IntegerField()
    updated_by = models.IntegerField()
    template_id = models.IntegerField()
    is_deleted = models.IntegerField()
    status_id = models.IntegerField()
    assigned_to_id = models.IntegerField(blank=True, null=True)
    custom_testrail_bdd_scenario = models.TextField(blank=True, null=True)
    estimate_original_date = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cases'


class TestrailCasesSharedSteps(models.Model):
    case_id = models.IntegerField()
    shared_step_id = models.IntegerField()
    created_on = models.IntegerField()
    updated_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'cases_shared_steps'


class TestrailConfigGroups(models.Model):
    project_id = models.IntegerField()
    name = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'config_groups'


class TestrailConfigs(models.Model):
    name = models.CharField(max_length=250)
    group_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'configs'


class TestrailDatasets(models.Model):
    project_id = models.IntegerField()
    title = models.CharField(max_length=50)
    data_value = models.TextField()
    is_archived = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'datasets'


class TestrailDefects(models.Model):
    defect_id = models.CharField(max_length=250)
    test_change_id = models.IntegerField()
    case_id = models.IntegerField(blank=True, null=True)
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'defects'


class TestrailEmailNotificationTemplate(models.Model):
    email_template = models.CharField(max_length=255)
    email_template_subject = models.TextField(blank=True, null=True)
    email_template_body = models.TextField()

    class Meta:
        managed = False
        db_table = 'email_notification_template'


class TestrailEntityAttachments(models.Model):
    id = models.BigAutoField(primary_key=True)
    entity_id = models.CharField(max_length=50, db_collation='latin1_bin', blank=True, null=True)
    attachment_id = models.PositiveBigIntegerField()
    entity_type_id = models.PositiveBigIntegerField()

    class Meta:
        managed = False
        db_table = 'entity_attachments'


class TestrailEntityTypes(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'entity_types'


class TestrailExports(models.Model):
    filename = models.CharField(max_length=250)
    size = models.BigIntegerField()
    created_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'exports'


class TestrailFieldTemplates(models.Model):
    field_id = models.IntegerField(primary_key=True)  # The composite primary key (field_id, template_id) found, that is not supported. The first column is selected.
    template_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'field_templates'
        unique_together = (('field_id', 'template_id'),)


class TestrailFields(models.Model):
    name = models.CharField(max_length=250)
    system_name = models.CharField(max_length=250)
    entity_id = models.IntegerField()
    label = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    type_id = models.IntegerField()
    location_id = models.IntegerField()
    display_order = models.IntegerField()
    configs = models.TextField()
    is_multi = models.IntegerField()
    is_active = models.IntegerField()
    status_id = models.IntegerField()
    is_system = models.IntegerField()
    include_all = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fields'
        unique_together = (('entity_id', 'name'),)


class TestrailGroupUsers(models.Model):
    group_id = models.IntegerField(primary_key=True)  # The composite primary key (group_id, user_id) found, that is not supported. The first column is selected.
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'group_users'
        unique_together = (('group_id', 'user_id'),)


class TestrailGroups(models.Model):
    name = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'groups'


class TestrailJobs(models.Model):
    name = models.CharField(unique=True, max_length=250)
    created_on = models.IntegerField()
    is_locked = models.IntegerField()
    heartbeat = models.IntegerField()
    is_done = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'jobs'


class TestrailMessageQueue(models.Model):
    message_id = models.TextField()
    data = models.TextField()
    processed = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'message_queue'


class TestrailMessageRecps(models.Model):
    user_id = models.IntegerField()
    message_id = models.IntegerField(primary_key=True)  # The composite primary key (message_id, user_id) found, that is not supported. The first column is selected.

    class Meta:
        managed = False
        db_table = 'message_recps'
        unique_together = (('message_id', 'user_id'),)


class TestrailMessages(models.Model):
    subject = models.CharField(max_length=250)
    body = models.TextField()
    created_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'messages'


class TestrailMilestones(models.Model):
    project_id = models.IntegerField()
    name = models.CharField(max_length=250)
    due_on = models.IntegerField(blank=True, null=True)
    completed_on = models.IntegerField(blank=True, null=True)
    is_completed = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    start_on = models.IntegerField(blank=True, null=True)
    started_on = models.IntegerField(blank=True, null=True)
    is_started = models.IntegerField()
    parent_id = models.IntegerField(blank=True, null=True)
    refs = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'milestones'


class TestrailMilestonesRefs(models.Model):
    reference_id = models.CharField(max_length=500)
    milestone_id = models.IntegerField()
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'milestones_refs'


class TestrailOauthAccessTokens(models.Model):
    access_token = models.CharField(max_length=400)
    client_id = models.CharField(max_length=80)
    user_id = models.IntegerField()
    expires = models.DateTimeField(blank=True, null=True)
    created_on = models.DateTimeField(blank=True, null=True)
    scope = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_access_tokens'


class TestrailOauthAuthorizationCodes(models.Model):
    authorization_code = models.CharField(max_length=400)
    client_id = models.CharField(max_length=80)
    user_id = models.IntegerField()
    redirect_uri = models.CharField(max_length=200, blank=True, null=True)
    expires = models.DateTimeField()
    scope = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_authorization_codes'


class TestrailOauthClients(models.Model):
    client_id = models.CharField(max_length=80)
    client_secret = models.CharField(max_length=80, blank=True, null=True)
    redirect_uri = models.CharField(max_length=500, blank=True, null=True)
    grant_types = models.CharField(max_length=80, blank=True, null=True)
    scope = models.CharField(max_length=40, blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'oauth_clients'


class TestrailOauthConnectionTokens(models.Model):
    user_id = models.IntegerField()
    access_token = models.CharField(max_length=100)
    refresh_token = models.CharField(max_length=100)
    token_type = models.CharField(max_length=30)
    oauth_connection_server = models.CharField(max_length=50)
    expires_in = models.IntegerField()
    created_date = models.IntegerField()
    modified_date = models.IntegerField()
    oauth_server_region = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'oauth_connection_tokens'


class TestrailOauthRefreshTokens(models.Model):
    refresh_token = models.CharField(max_length=400)
    client_id = models.CharField(max_length=80)
    user_id = models.IntegerField()
    expires = models.DateTimeField()
    created_on = models.DateTimeField(blank=True, null=True)
    scope = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_refresh_tokens'


class TestrailOauthScopes(models.Model):
    scope = models.TextField(blank=True, null=True)
    is_default = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'oauth_scopes'


class TestrailOtp(models.Model):
    code = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    used = models.IntegerField(blank=True, null=True)
    valid_upto = models.IntegerField(blank=True, null=True)
    created_date = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'otp'


class TestrailPendoAuth(models.Model):
    name = models.CharField(unique=True, max_length=80)
    value = models.CharField(max_length=2048)

    class Meta:
        managed = False
        db_table = 'pendo_auth'


class TestrailPendoData(models.Model):
    data = models.TextField()
    processed = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pendo_data'


class TestrailPhinxlog(models.Model):
    version = models.BigIntegerField(primary_key=True)
    migration_name = models.CharField(max_length=100, blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    breakpoint = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'phinxlog'


class TestrailPreferences(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=250)
    value = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'preferences'
        unique_together = (('user_id', 'name'),)


class TestrailPriorities(models.Model):
    priority = models.IntegerField()
    name = models.CharField(max_length=250)
    short_name = models.CharField(max_length=250)
    is_default = models.IntegerField()
    is_deleted = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'priorities'


class TestrailProjectAccess(models.Model):
    project_id = models.IntegerField(primary_key=True)  # The composite primary key (project_id, user_id) found, that is not supported. The first column is selected.
    user_id = models.IntegerField()
    access = models.IntegerField()
    role_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_access'
        unique_together = (('project_id', 'user_id'),)


class TestrailProjectAssignment(models.Model):
    user_id = models.IntegerField(primary_key=True)  # The composite primary key (user_id, project_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'project_assignment'
        unique_together = (('user_id', 'project_id'),)


class TestrailProjectFavs(models.Model):
    user_id = models.IntegerField(primary_key=True)  # The composite primary key (user_id, project_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    created_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'project_favs'
        unique_together = (('user_id', 'project_id'),)


class TestrailProjectGroups(models.Model):
    project_id = models.IntegerField(primary_key=True)  # The composite primary key (project_id, group_id) found, that is not supported. The first column is selected.
    group_id = models.IntegerField()
    access = models.IntegerField()
    role_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_groups'
        unique_together = (('project_id', 'group_id'),)


class TestrailProjectHistory(models.Model):
    project_id = models.IntegerField()
    action = models.IntegerField()
    created_on = models.IntegerField()
    user_id = models.IntegerField()
    suite_id = models.IntegerField(blank=True, null=True)
    milestone_id = models.IntegerField(blank=True, null=True)
    run_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    is_deleted = models.IntegerField()
    plan_id = models.IntegerField(blank=True, null=True)
    case_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'project_history'


class TestrailProjects(models.Model):
    name = models.CharField(max_length=250)
    announcement = models.TextField(blank=True, null=True)
    show_announcement = models.IntegerField()
    defect_id_url = models.CharField(max_length=250, blank=True, null=True)
    defect_add_url = models.CharField(max_length=250, blank=True, null=True)
    default_access = models.IntegerField()
    default_role_id = models.IntegerField(blank=True, null=True)
    reference_id_url = models.CharField(max_length=250, blank=True, null=True)
    reference_add_url = models.CharField(max_length=250, blank=True, null=True)
    defect_plugin = models.CharField(max_length=250, blank=True, null=True)
    defect_config = models.TextField(blank=True, null=True)
    is_completed = models.IntegerField()
    completed_on = models.IntegerField(blank=True, null=True)
    defect_template = models.TextField(blank=True, null=True)
    suite_mode = models.IntegerField()
    master_id = models.IntegerField(blank=True, null=True)
    reference_plugin = models.CharField(max_length=250, blank=True, null=True)
    reference_config = models.TextField(blank=True, null=True)
    case_statuses_enabled = models.IntegerField()
    text_format_type = models.CharField(max_length=255, blank=True, null=True)
    is_test_case_approval_enabled = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'projects'


class TestrailRecentSearches(models.Model):
    user_id = models.IntegerField()
    query = models.CharField(max_length=4096)
    created_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'recent_searches'


class TestrailRefs(models.Model):
    reference_id = models.CharField(max_length=250)
    case_id = models.IntegerField()
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'refs'


class TestrailReportApiTemplates(models.Model):
    plugin = models.CharField(max_length=250)
    project_id = models.IntegerField()
    access = models.IntegerField()
    created_by = models.IntegerField()
    created_on = models.IntegerField()
    system_options = models.TextField(blank=True, null=True)
    custom_options = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'report_api_templates'


class TestrailReportJobs(models.Model):
    plugin = models.CharField(max_length=250)
    project_id = models.IntegerField()
    created_by = models.IntegerField()
    created_on = models.IntegerField()
    executed_on = models.IntegerField(blank=True, null=True)
    system_options = models.TextField(blank=True, null=True)
    custom_options = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'report_jobs'


class TestrailReports(models.Model):
    plugin = models.CharField(max_length=250)
    project_id = models.IntegerField()
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    access = models.IntegerField()
    created_by = models.IntegerField()
    created_on = models.IntegerField()
    executed_on = models.IntegerField(blank=True, null=True)
    execution_time = models.IntegerField(blank=True, null=True)
    dir = models.CharField(max_length=250, blank=True, null=True)
    formats = models.TextField()
    system_options = models.TextField(blank=True, null=True)
    custom_options = models.TextField(blank=True, null=True)
    status = models.IntegerField()
    status_message = models.TextField(blank=True, null=True)
    status_trace = models.TextField(blank=True, null=True)
    is_locked = models.IntegerField()
    heartbeat = models.IntegerField()
    defects_from_most_recent_tests = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reports'


class TestrailRoles(models.Model):
    name = models.CharField(max_length=250)
    permissions = models.IntegerField()
    is_default = models.IntegerField()
    display_order = models.IntegerField()
    is_project_admin = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'roles'


class TestrailRunDynamicFilters(models.Model):
    run_id = models.BigIntegerField(primary_key=True)
    filters = models.TextField()

    class Meta:
        managed = False
        db_table = 'run_dynamic_filters'


class TestrailRuns(models.Model):
    suite_id = models.IntegerField(blank=True, null=True)
    milestone_id = models.IntegerField(blank=True, null=True)
    created_on = models.IntegerField()
    user_id = models.IntegerField()
    project_id = models.IntegerField()
    is_completed = models.IntegerField()
    completed_on = models.IntegerField(blank=True, null=True)
    include_all = models.IntegerField()
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    passed_count = models.IntegerField()
    retest_count = models.IntegerField()
    failed_count = models.IntegerField()
    untested_count = models.IntegerField()
    assignedto_id = models.IntegerField(blank=True, null=True)
    is_plan = models.IntegerField()
    plan_id = models.IntegerField(blank=True, null=True)
    entry_id = models.CharField(max_length=250, blank=True, null=True)
    entries = models.TextField(blank=True, null=True)
    config = models.CharField(max_length=250, blank=True, null=True)
    config_ids = models.CharField(max_length=250, blank=True, null=True)
    entry_index = models.IntegerField(blank=True, null=True)
    blocked_count = models.IntegerField()
    is_editable = models.IntegerField()
    content_id = models.IntegerField(blank=True, null=True)
    custom_status1_count = models.IntegerField()
    custom_status2_count = models.IntegerField()
    custom_status3_count = models.IntegerField()
    custom_status4_count = models.IntegerField()
    custom_status5_count = models.IntegerField()
    custom_status6_count = models.IntegerField()
    custom_status7_count = models.IntegerField()
    updated_by = models.IntegerField()
    updated_on = models.IntegerField()
    refs = models.CharField(max_length=250, blank=True, null=True)
    dataset_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'runs'


class TestrailRunsRefs(models.Model):
    reference_id = models.CharField(max_length=250)
    run_id = models.IntegerField()
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'runs_refs'


class TestrailSamlAssertions(models.Model):
    assertion_id = models.CharField(unique=True, max_length=100)
    expires_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'saml_assertions'


class TestrailSections(models.Model):
    suite_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=250)
    display_order = models.IntegerField()
    is_copy = models.IntegerField()
    copyof_id = models.IntegerField(blank=True, null=True)
    parent_id = models.IntegerField(blank=True, null=True)
    depth = models.IntegerField()
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sections'


class TestrailSessions(models.Model):
    session_id = models.CharField(unique=True, max_length=40)
    ip_address = models.CharField(max_length=16)
    user_agent = models.CharField(max_length=250)
    last_activity = models.IntegerField()
    user_data = models.TextField(blank=True, null=True)
    is_invalidated = models.IntegerField()
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'sessions'


class TestrailSettings(models.Model):
    name = models.CharField(unique=True, max_length=250)
    value = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'settings'


class TestrailSharedStepChanges(models.Model):
    shared_step_id = models.IntegerField()
    version = models.IntegerField()
    type_id = models.IntegerField()
    created_on = models.IntegerField()
    updated_by = models.IntegerField()
    changes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shared_step_changes'


class TestrailSharedStepElements(models.Model):
    shared_step_id = models.IntegerField()
    display_order = models.IntegerField()
    content = models.TextField(blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)
    expected = models.TextField(blank=True, null=True)
    refs = models.CharField(max_length=250, blank=True, null=True)
    created_on = models.IntegerField()
    updated_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'shared_step_elements'


class TestrailSharedSteps(models.Model):
    project_id = models.IntegerField()
    title = models.CharField(max_length=250)
    created_on = models.IntegerField()
    updated_on = models.IntegerField()
    created_by = models.IntegerField()
    updated_by = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'shared_steps'


class TestrailSsoSettings(models.Model):
    sso_integration_name = models.CharField(unique=True, max_length=250)
    testrail_entity_id = models.CharField(max_length=250, blank=True, null=True)
    sso_url = models.CharField(max_length=250, blank=True, null=True)
    idp_sso_url = models.CharField(max_length=250, blank=True, null=True)
    idp_issuer_url = models.CharField(max_length=250, blank=True, null=True)
    ssl_certificate = models.TextField(blank=True, null=True)
    saml_encryption_private_key = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sso_settings'


class TestrailSsoSettingsOauth(models.Model):
    sso_configuration = models.CharField(unique=True, max_length=250)
    oauth_client_id = models.CharField(max_length=250, blank=True, null=True)
    oauth_client_secret = models.CharField(max_length=250, blank=True, null=True)
    oauth_issuer_uri = models.CharField(max_length=250, blank=True, null=True)
    oauth_user_auth_uri = models.CharField(max_length=250, blank=True, null=True)
    oauth_user_info_uri = models.CharField(max_length=250, blank=True, null=True)
    oauth_create_account_on_first_login = models.IntegerField(blank=True, null=True)
    oauth_whitelist_domains = models.TextField(blank=True, null=True)
    oauth_sso_url = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sso_settings_oauth'


class TestrailSsoSettingsOpenid(models.Model):
    sso_configuration = models.CharField(unique=True, max_length=250)
    client_id = models.CharField(max_length=250, blank=True, null=True)
    client_secret = models.CharField(max_length=250, blank=True, null=True)
    issuer_uri = models.CharField(max_length=250, blank=True, null=True)
    openid_create_account_on_first_login = models.IntegerField(blank=True, null=True)
    whitelist_domains = models.TextField(blank=True, null=True)
    sso_url = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sso_settings_openid'


class TestrailStatuses(models.Model):
    name = models.CharField(unique=True, max_length=250)
    system_name = models.CharField(max_length=250)
    label = models.CharField(max_length=250)
    color_dark = models.IntegerField()
    color_medium = models.IntegerField()
    color_bright = models.IntegerField()
    display_order = models.IntegerField()
    is_system = models.IntegerField()
    is_active = models.IntegerField()
    is_untested = models.IntegerField()
    is_final = models.IntegerField()
    is_notapplicable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'statuses'


class TestrailSubscriptions(models.Model):
    user_id = models.IntegerField()
    is_subscribed = models.IntegerField()
    test_id = models.IntegerField()
    run_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'subscriptions'
        unique_together = (('run_id', 'test_id', 'user_id'),)


class TestrailSuites(models.Model):
    name = models.CharField(max_length=250)
    project_id = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    created_on = models.IntegerField()
    created_by = models.IntegerField()
    is_copy = models.IntegerField()
    copyof_id = models.IntegerField(blank=True, null=True)
    is_master = models.IntegerField()
    is_baseline = models.IntegerField()
    parent_id = models.IntegerField(blank=True, null=True)
    is_completed = models.IntegerField()
    completed_on = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'suites'


class TestrailTask(models.Model):
    id = models.IntegerField(primary_key=True)
    is_locked = models.IntegerField()
    heartbeat = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'task'


class TestrailTemplateProjects(models.Model):
    template_id = models.IntegerField(primary_key=True)  # The composite primary key (template_id, project_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'template_projects'
        unique_together = (('template_id', 'project_id'),)


class TestrailTemplates(models.Model):
    name = models.CharField(max_length=250)
    is_default = models.IntegerField()
    is_deleted = models.IntegerField()
    include_all = models.IntegerField()
    is_editable = models.IntegerField(blank=True, null=True)
    is_removable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'templates'


class TestrailTestActivities(models.Model):
    date = models.IntegerField(primary_key=True)  # The composite primary key (date, project_id, run_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    run_id = models.IntegerField()
    passed_count = models.IntegerField()
    retest_count = models.IntegerField()
    failed_count = models.IntegerField()
    untested_count = models.IntegerField()
    blocked_count = models.IntegerField()
    custom_status1_count = models.IntegerField()
    custom_status2_count = models.IntegerField()
    custom_status3_count = models.IntegerField()
    custom_status4_count = models.IntegerField()
    custom_status5_count = models.IntegerField()
    custom_status6_count = models.IntegerField()
    custom_status7_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test_activities'
        unique_together = (('date', 'project_id', 'run_id'),)


class TestrailTestAssocs(models.Model):
    test_change_id = models.IntegerField()
    test_id = models.IntegerField()
    name = models.CharField(max_length=250)
    value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test_assocs'


class TestrailTestChanges(models.Model):
    test_id = models.IntegerField()
    user_id = models.IntegerField()
    status_id = models.IntegerField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    version = models.CharField(max_length=250, blank=True, null=True)
    elapsed = models.CharField(max_length=20, blank=True, null=True)
    defects = models.CharField(max_length=250, blank=True, null=True)
    created_on = models.IntegerField()
    assignedto_id = models.IntegerField(blank=True, null=True)
    unassigned = models.IntegerField()
    project_id = models.IntegerField()
    run_id = models.IntegerField()
    is_selected = models.IntegerField()
    caching = models.IntegerField()
    custom_step_results = models.TextField(blank=True, null=True)
    custom_testrail_bdd_scenario_results = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'test_changes'


class TestrailTestProgress(models.Model):
    date = models.IntegerField(primary_key=True)  # The composite primary key (date, project_id, run_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    run_id = models.IntegerField()
    tests = models.IntegerField()
    forecasts = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test_progress'
        unique_together = (('date', 'project_id', 'run_id'),)


class TestrailTestResultsImportJobs(models.Model):
    project_id = models.IntegerField()
    assignedto_id = models.IntegerField()
    plan_id = models.IntegerField(blank=True, null=True)
    milestone_id = models.IntegerField(blank=True, null=True)
    automation_type = models.IntegerField(blank=True, null=True)
    file = models.CharField(max_length=50)
    is_running = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test_results_import_jobs'


class TestrailTestTimers(models.Model):
    test_id = models.IntegerField(primary_key=True)  # The composite primary key (test_id, user_id) found, that is not supported. The first column is selected.
    user_id = models.IntegerField()
    started_on = models.IntegerField()
    elapsed = models.IntegerField()
    is_paused = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test_timers'
        unique_together = (('test_id', 'user_id'),)


class TestrailTests(models.Model):
    run_id = models.IntegerField()
    case_id = models.IntegerField(blank=True, null=True)
    status_id = models.IntegerField()
    assignedto_id = models.IntegerField(blank=True, null=True)
    is_selected = models.IntegerField()
    last_status_change_id = models.IntegerField(blank=True, null=True)
    is_completed = models.IntegerField()
    in_progress = models.IntegerField()
    in_progress_by = models.IntegerField(blank=True, null=True)
    content_id = models.IntegerField(blank=True, null=True)
    tested_by = models.IntegerField(blank=True, null=True)
    tested_on = models.IntegerField(blank=True, null=True)
    added_dynamic = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tests'


class TestrailUiscripts(models.Model):
    name = models.CharField(max_length=250)
    is_active = models.IntegerField()
    includes = models.CharField(max_length=250, blank=True, null=True)
    excludes = models.CharField(max_length=250, blank=True, null=True)
    meta = models.TextField(blank=True, null=True)
    js = models.TextField(blank=True, null=True)
    css = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'uiscripts'


class TestrailUserColumns(models.Model):
    user_id = models.IntegerField(primary_key=True)  # The composite primary key (user_id, project_id, area_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    area_id = models.IntegerField()
    columns = models.TextField()
    group_by = models.CharField(max_length=250)
    group_order = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'user_columns'
        unique_together = (('user_id', 'project_id', 'area_id'),)


class TestrailUserExports(models.Model):
    user_id = models.IntegerField(primary_key=True)  # The composite primary key (user_id, project_id, area_id, format) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    area_id = models.IntegerField()
    format = models.CharField(max_length=250)
    options = models.TextField()

    class Meta:
        managed = False
        db_table = 'user_exports'
        unique_together = (('user_id', 'project_id', 'area_id', 'format'),)


class TestrailUserFields(models.Model):
    name = models.CharField(unique=True, max_length=250)
    system_name = models.CharField(max_length=250)
    label = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    type_id = models.IntegerField()
    fallback = models.CharField(max_length=750, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_fields'


class TestrailUserFilters(models.Model):
    user_id = models.IntegerField(primary_key=True)  # The composite primary key (user_id, project_id, area_id) found, that is not supported. The first column is selected.
    project_id = models.IntegerField()
    area_id = models.IntegerField()
    filters = models.TextField()

    class Meta:
        managed = False
        db_table = 'user_filters'
        unique_together = (('user_id', 'project_id', 'area_id'),)


class TestrailUserLogins(models.Model):
    name = models.CharField(unique=True, max_length=250)
    created_on = models.IntegerField()
    updated_on = models.IntegerField()
    attempts = models.IntegerField()
    mfa_attempts = models.IntegerField()
    mfa_updated_on = models.IntegerField()
    current_auth = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_logins'


class TestrailUserSettings(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=250)
    value = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_settings'
        unique_together = (('user_id', 'name'),)


class TestrailUserTokens(models.Model):
    user_id = models.IntegerField()
    type_id = models.IntegerField()
    name = models.CharField(max_length=250, blank=True, null=True)
    series = models.CharField(max_length=250, blank=True, null=True)
    hash = models.CharField(max_length=250)
    created_on = models.IntegerField()
    expires_on = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_tokens'


class TestrailUsers(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(unique=True, max_length=250)
    is_admin = models.IntegerField()
    salt = models.CharField(max_length=250)
    hash = models.CharField(max_length=250)
    is_active = models.IntegerField()
    rememberme = models.CharField(max_length=250)
    locale = models.CharField(max_length=250, blank=True, null=True)
    language = models.CharField(max_length=250, blank=True, null=True)
    notifications = models.IntegerField()
    csrf = models.CharField(max_length=250)
    role_id = models.IntegerField()
    login_token = models.CharField(max_length=250, blank=True, null=True)
    timezone = models.CharField(max_length=250, blank=True, null=True)
    login_token_until = models.IntegerField(blank=True, null=True)
    last_activity = models.IntegerField(blank=True, null=True)
    is_reset_password_forced = models.IntegerField()
    data_processing_agreement = models.TextField(blank=True, null=True)
    theme = models.IntegerField(blank=True, null=True)
    is_bdd_autocomplete_enabled = models.IntegerField(blank=True, null=True)
    is_mfa_enabled = models.IntegerField(blank=True, null=True)
    auth_app_connected = models.IntegerField(blank=True, null=True)
    mfa_secret = models.CharField(max_length=250, blank=True, null=True)
    password_reset_token = models.CharField(max_length=32, blank=True, null=True)
    password_reset_token_until = models.IntegerField(blank=True, null=True)
    is_sso_enabled = models.IntegerField(blank=True, null=True)
    is_fallback_password_set = models.IntegerField(blank=True, null=True)
    forgot_password_attempts = models.IntegerField()
    forgot_password_attempt_on = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'


class TestrailVariables(models.Model):
    project_id = models.IntegerField()
    variable_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'variables'


class TestrailWebhookDeliveries(models.Model):
    delivery_id = models.CharField(max_length=50)
    hook_id = models.CharField(max_length=50)
    user_id = models.CharField(max_length=50)
    request_headers = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    request_payload = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    response_headers = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    response_payload = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    state = models.CharField(max_length=3, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'webhook_deliveries'


class TestrailWebhookProjects(models.Model):
    hook_id = models.IntegerField()
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'webhook_projects'


class TestrailWebhooks(models.Model):
    hook_id = models.CharField(max_length=50)
    webhook_name = models.CharField(max_length=300)
    payload_url = models.CharField(max_length=300)
    method = models.CharField(max_length=10)
    content_type = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    request_headers = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    request_payload = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    response_headers = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    response_payload = models.TextField(db_collation='utf8mb4_bin', blank=True, null=True)
    state = models.CharField(max_length=3, blank=True, null=True)
    secret = models.CharField(max_length=100, blank=True, null=True)
    events = models.TextField(blank=True, null=True)
    projects = models.IntegerField(blank=True, null=True)
    active = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField()
    attempt = models.IntegerField()
    retry_at = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'webhooks'
