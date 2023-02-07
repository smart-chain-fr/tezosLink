import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li style={{color: "blue"}}>
        <Link href="/a" as="/a">
          Hello
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          b
        </Link>
      </li>
    </ul>
  )
}