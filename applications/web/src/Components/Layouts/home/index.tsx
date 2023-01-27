export interface IProps   {
name: string,
}

export default function Home(props: IProps){
    return (
        <div>
          <h1>{props.name}</h1>
        </div>
      )
} 

