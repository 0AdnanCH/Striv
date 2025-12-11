import { GetApplicationsFilterDto, PaginatedApplicationResponseDto } from "../../dtos/getTrainerApplications.dto";

export interface IAdminTrainerApplicationService {
  listApplications(filters: GetApplicationsFilterDto): Promise<PaginatedApplicationResponseDto>;
}