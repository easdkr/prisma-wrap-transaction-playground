export interface TransactionalUsecase<Args, Result> {
  run(args: Args): Promise<Result>;
}
