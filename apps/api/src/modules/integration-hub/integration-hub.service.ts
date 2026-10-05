import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export enum HubEvent {
  // Project Management Events
  PROJECT_CREATED = 'project.created',
  PROJECT_UPDATED = 'project.updated',
  PROJECT_STATUS_CHANGED = 'project.status_changed',
  PROJECT_ACTIVITY_COMPLETED = 'project.activity_completed',

  // Beneficiary Events
  BENEFICIARY_REGISTERED = 'beneficiary.registered',
  BENEFICIARY_UPDATED = 'beneficiary.updated',
  BENEFICIARY_LINKED_TO_PROJECT = 'beneficiary.linked_to_project',

  // Finance Events
  BUDGET_COMMITTED = 'budget.committed',
  BUDGET_RELEASED = 'budget.released',
  GRANT_APPROVED = 'grant.approved',
  GRANT_DISBURSED = 'grant.disbursed',

  // HR Events
  STAFF_ASSIGNED = 'staff.assigned',
  STAFF_DEPLOYED = 'staff.deployed',
  VOLUNTEER_REGISTERED = 'volunteer.registered',
  VOLUNTEER_DEPLOYED = 'volunteer.deployed',

  // GRC Events
  COMPLAINT_SUBMITTED = 'complaint.submitted',
  COMPLAINT_ESCALATED = 'complaint.escalated',
  RISK_IDENTIFIED = 'risk.identified',
  AUDIT_TRIGGERED = 'audit.triggered',

  // MEAL Events
  INDICATOR_SUBMITTED = 'indicator.submitted',
  SURVEY_COMPLETED = 'survey.completed',
  DATA_VALIDATED = 'data.validated',

  // Sync Events
  SYNC_COMPLETED = 'sync.completed',
  SYNC_FAILED = 'sync.failed',
}

@Injectable()
export class IntegrationHubService implements OnModuleInit {
  private readonly logger = new Logger(IntegrationHubService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    this.logger.log('Integration Hub initialized');
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Project Management -> Finance
    this.eventEmitter.on(HubEvent.PROJECT_ACTIVITY_COMPLETED, async (data) => {
      this.logger.log(`Project activity completed: ${data.projectId}`);
      await this.handleProjectActivityCompleted(data);
    });

    // Beneficiary -> Project Management
    this.eventEmitter.on(HubEvent.BENEFICIARY_REGISTERED, async (data) => {
      this.logger.log(`Beneficiary registered: ${data.beneficiaryCode}`);
      await this.handleBeneficiaryRegistered(data);
    });

    // GRC -> Risk Escalation
    this.eventEmitter.on(HubEvent.COMPLAINT_SUBMITTED, async (data) => {
      this.logger.log(`Complaint submitted: ${data.complaintId}`);
      await this.handleComplaintSubmitted(data);
    });

    // HR -> Project Deployment
    this.eventEmitter.on(HubEvent.VOLUNTEER_DEPLOYED, async (data) => {
      this.logger.log(`Volunteer deployed: ${data.volunteerId}`);
      await this.handleVolunteerDeployed(data);
    });
  }

  async emitEvent(event: HubEvent, data: any) {
    this.logger.log(`Emitting event: ${event}`);
    this.eventEmitter.emit(event, data);
  }

  private async handleProjectActivityCompleted(data: any) {
    // Trigger budget release for completed activities
    await this.emitEvent(HubEvent.BUDGET_RELEASED, {
      projectId: data.projectId,
      activityId: data.activityId,
      amount: data.budgetAmount,
    });
  }

  private async handleBeneficiaryRegistered(data: any) {
    // Update beneficiary counts in relevant projects
    await this.emitEvent(HubEvent.PROJECT_UPDATED, {
      projectId: data.projectId,
      updateType: 'beneficiary_count',
    });
  }

  private async handleComplaintSubmitted(data: any) {
    // Auto-escalate sensitive complaints
    if (data.isSensitive) {
      await this.emitEvent(HubEvent.COMPLAINT_ESCALATED, {
        complaintId: data.complaintId,
        severity: 'HIGH',
        escalateTo: 'RISK_OFFICER',
      });
    }
  }

  private async handleVolunteerDeployed(data: any) {
    // Update project resource allocation
    await this.emitEvent(HubEvent.PROJECT_UPDATED, {
      projectId: data.projectId,
      updateType: 'resource_allocation',
    });
  }

  async getEventHistory(filters?: any) {
    // This would integrate with a persistent event store
    // For now, return a placeholder
    return {
      totalEvents: 0,
      recentEvents: [],
    };
  }
}
