import { useRef } from 'react'
import { useSyncScrollerEffect } from './hooks'
import './index.css'

export default function App() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useSyncScrollerEffect([leftRef, rightRef])

  const data = [...Array(12).keys()].map((key) => ({
    id: key + 1,
    img: 'https://pbs.twimg.com/profile_banners/1544388229520011264/1676917334/600x200',
  }))

  return (
    <div className="App">
      <div ref={leftRef} id="left">
        {data.map((row) => (
          <div key={`left_${row.id}`}>
            <div>{row.id}</div>
            <img
              className={row.id % 2 === 0 ? 'leftimg1' : 'leftimg2'}
              src={row.img}
              alt="img"
            />
          </div>
        ))}
      </div>
      <div ref={rightRef} id="right">
        {data.map((row) => (
          <div key={`right_${row.id}`}>
            <div>{row.id}</div>
            <img
              className={row.id % 4 === 0 ? 'rightimg1' : 'rightimg2'}
              src={row.img}
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
