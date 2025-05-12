
export interface BaseResultDto<T> {
  success: boolean;
  message: string;
  data: T | null;
}
