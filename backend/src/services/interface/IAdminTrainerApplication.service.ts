import { IRejectionPayload } from "../../dtos/adminTrainerApplicationRejection.dto";
import { GetApplicationsFilterDto, PaginatedApplicationResponseDto } from "../../dtos/getTrainerApplications.dto";
import { ITrainerApplicationDetailsResponse } from "../../dtos/trainerVerification.dto";

export interface IAdminTrainerApplicationService {
  listApplications(filters: GetApplicationsFilterDto): Promise<PaginatedApplicationResponseDto>;
  getTrainerApplicationDetails(applicationId: string): Promise<ITrainerApplicationDetailsResponse>;
  approveApplication(applicationId: string, adminId: string): Promise<undefined>;
  rejectApplication(applicationId: string, rejectionData: IRejectionPayload, adminId: string): Promise<void>
}