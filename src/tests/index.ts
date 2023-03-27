import MetricsServiceTest from "@Tests/common/services/metrics/MetricsServiceTest";
import ObjectHydrateTest from "@Tests/common/helpers/ObjectHydrateTest";
import ProjectEntityTest from "@Tests/common/ressources/projects/ProjectEntityTest";
import ProjectsRepositoryTest from "@Tests/common/repositories/projects/ProjectsRepositoryTest";
import ProjectsServiceTest from "@Tests/common/services/projects/ProjectsServiceTest";
import VariablesTest from "@Tests/common/config/variables/VariablesTest";

export default
	[ MetricsServiceTest
	, ObjectHydrateTest
	, ProjectEntityTest
	, ProjectsRepositoryTest
	, ProjectsServiceTest
	, VariablesTest
	];
