import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { RouterOutput, trpc } from '@/utils/trpc';

type ProjectByIdOutput = RouterOutput['project']['byUUID'];

function ProjectItem(props: { project: ProjectByIdOutput }) {
  const { project } = props;
  return (
    <>
      <h1>{project.title}</h1>
      <em>Created {project.createdAt.toLocaleDateString('fr-fr')}</em>

      <p>{project.title}</p>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(project, null, 4)}</pre>
    </>
  )
}

const ProjectViewPage: NextPageWithLayout = () => {
  const uuid = useRouter().query.uuid as string;
  const projectQuery = trpc.project.byUUID.useQuery({ uuid });

  if (projectQuery.error) {
    return (
      <NextError
        title={projectQuery.error.message}
        statusCode={projectQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (projectQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = projectQuery;
  return <ProjectItem project={data} />;
};

export default ProjectViewPage;