import BaseApiService from "src/front/Api/BaseApiService"
import { IProject } from "@Front/interfaces/interfaces"

type IPostProject = {
    title: string,
    network: string
}

export default class Project extends BaseApiService {
    private static instance: Project;
    private baseURl = this.backUrl!.concat('/projects');

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance =  new Project();
            return this.instance;
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
        console.log("API URL FOR GET-------------",url);
        try {
            return await this.getRequest<IProject>(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }

    public async postProject(params: IPostProject): Promise<IProject> {
        console.log("API URL FOR POST-------------",this.baseURl);
        const url = new URL(this.baseURl);
        try {
            return await this.postRequest<IProject>(url, params);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
}