export default abstract class BaseRepository {
	protected readonly maxFetchRows = 100;
	protected readonly defaultFetchRows = 50;
}
