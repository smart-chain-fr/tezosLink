import BaseApiService from "src/front/Api/BaseApiService"
import { IProject } from "src/front/interfaces"
import { Service } from "typedi";

type IPostProject = {
    title: string,
    network: string
}
@Service()
export default class Project extends BaseApiService {
    private static instance: Project;
    private readonly baseURl = this.backUrl.concat('/projects');

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!this.instance) {
            return new Project();
        } else {
            return this.instance;
        }
    }

    public async getAllProject(): Promise<IProject[]> {
        const url = new URL(this.baseURl);
        try {
            return await this.getRequest<IProject[]>(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }

    public async getOneProject(uuid: string): Promise<IProject> {
        const url = new URL(this.baseURl.concat('/').concat(uuid));
        try {
            return await this.getRequest<IProject>(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }

    public async postProject(params: IPostProject): Promise<IProject> {
        const url = new URL(this.baseURl);
        try {
            return await this.postRequest<IProject>(url, params);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
}