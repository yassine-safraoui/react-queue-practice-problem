import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let [lines, setLines] = useState<Array<Array<Number>>>([[1000], [1000, 200], [1300], [], [2000]])
  // let [lines, setLines] = useState<Array<Array<Number>>>([[1], [2, 1], [4], [], [9]])
  let commandsSum = useRef(lines.map(line => line.reduce((previousValue, count) => (previousValue.valueOf() + count.valueOf()), 0)));
  let [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInterval(() => {
      setLines(lines => {
        let linesCopy = lines.map(e => e.map(v => (v.valueOf() - 1))).
          map(e => e.filter(v => (v != 0)))
        commandsSum.current = linesCopy.map(line => line.reduce((previousValue, count) => (previousValue.valueOf() + count.valueOf()), 0))
        return linesCopy
      });
    }, 500);
  }, [])

  return <>
    <div className='flex gap-4 justify-center items-center my-16'>
      <label htmlFor="nbr-items">Number of items:</label>
      <input type="number" id='nbr-items' value={inputValue} onChange={(value) => setInputValue(value.target.value)} />
      <button onClick={_ => {
        let linesCopy = lines.map(e => e.map(v => v))
        let commandsSumCopy = [...commandsSum.current].sort()
        linesCopy[commandsSum.current.indexOf(commandsSumCopy[0])].push(Number(inputValue))
        commandsSum.current[commandsSum.current.indexOf(commandsSumCopy[0])] = commandsSum.current[commandsSum.current.indexOf(commandsSumCopy[0])].valueOf() + Number(inputValue)
        setLines(linesCopy)
        setInputValue("")
      }}>checkout</button>
    </div>
    <div className='flex justify-center gap-10'>
      {[1, 2, 3, 4, 5].map(index => {
        return <div className='flex flex-col gap-8' key={index}>
          <div className='flex items-center justify-center h-28 w-28 bg-blue-200 text-black rounded-xl text-xl select-none'>Queue {index}</div>
          {lines[index - 1].length != 0 ? lines[index - 1].map((order, orderIndex) => <QueueItem key={orderIndex} count={order.toString()} />) : ""}
        </div>
      })}
    </div>
  </>

}

function QueueItem(props: { count: string }) {
  let [countState, setCountState] = useState(props.count)
  useEffect(() => {
    setCountState(props.count)
  }, [props.count])
  return <div className='flex items-center justify-center h-28 w-28 bg-slate-50 text-black rounded-full text-xl select-none' >{countState}</div>
}

export default App
