import { Registry, collectDefaultMetrics } from 'prom-client';
import { Service } from 'typedi';

@Service()
export class InfrastructureMetrics {
  private static instance: InfrastructureMetrics;
  private registry: Registry;

  private constructor() {
    // Initialize the prom-client registry and collect default metrics
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });
  }

  public static getInstance(): InfrastructureMetrics {
    if (!InfrastructureMetrics.instance) {
      InfrastructureMetrics.instance = new InfrastructureMetrics();
    }

    return InfrastructureMetrics.instance;
  }

  public getRegistry(): Registry {
    return this.registry;
  }
}
