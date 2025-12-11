import { IAdminTrainerApplicationService } from '../interface/IAdminTrainerApplication.service';
import { ITrainerApplicationRepository } from '../../repositories/interface/ITrainerApplication.repository';
import { GetApplicationsFilterDto, PaginatedApplicationResponseDto, TrainerApplicationListItemDto } from '../../dtos/getTrainerApplications.dto';

export class AdminTrainerApplicationService implements IAdminTrainerApplicationService {
  constructor(
    private readonly _trainerApplicationRepository: ITrainerApplicationRepository
  ) {}

  /**
   * Fetches paginated, sorted, and filtered trainer applications.
   * Logic: Handles input sanitization and DTO mapping.
   */
  async listApplications(filters: GetApplicationsFilterDto): Promise<PaginatedApplicationResponseDto> {
    const page = Math.max(filters.page || 1, 1);
    const limit = Math.max(filters.limit || 10, 1);
    const search = filters.search?.trim() || '';

    // 2. Call Repository (The heavy lifting happens here)
    const result = await this._trainerApplicationRepository.findWithAggregation({
      page,
      limit,
      search,
      status: filters.status,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });

    return {
      data: result.data,
      meta: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      }
    };
  }
}
