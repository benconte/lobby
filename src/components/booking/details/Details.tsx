import Summary from './Summary'
import SubDetails from './SubDetails'

function Details({ hotel }: { hotel: any }) {
  return (
    <div className='w-full flex flex-col lg:flex-row items-start gap-3'>
      <SubDetails hotel={hotel} />
      <Summary hotel={hotel} />
    </div>
  )
}

export default Details