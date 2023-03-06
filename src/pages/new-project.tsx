import dynamic from "next/dist/shared/lib/dynamic"
const DynamicNewProject = dynamic(() => import('@Components/Layouts/NewProject'), {
    ssr: true,
  })

export default function Route() {
    return <DynamicNewProject/>
}