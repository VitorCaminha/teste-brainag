import { useEffect, useState } from 'react'

import './styles.css'

import CardComponent from '../components/Card'
import Chart from '../components/Chart'

import api from '../services/api'

interface IData {
  totalAcres: number;
  totalByCrops: Array<{name: string; value: number}>;
  totalByStates: Array<{name: string; value: number}>;
  totalFarms: number;
  totalFreeArea: number;
  totalPlantedArea: number;
}

function Home() {
  const [data, setData] = useState<IData>({} as IData)

  useEffect(() => {
    api.get('/dashboard').then(response => {
      const formattedStates = Object.keys(response.data.totalByStates).map((state: string) => ({
        name: state,
        value: response.data.totalByStates[state]
      }))
      
      const formattedCrops = Object.keys(response.data.totalByCrops).map((crop: string) => ({
        name: crop,
        value: response.data.totalByCrops[crop]
      }))

      setData({ ...response.data, totalByStates: formattedStates, totalByCrops: formattedCrops })
    })
  }, [])

  return (
    <>
      <h1 className='title'>Brain Agriculture</h1>
      <div className='line'>
        <CardComponent title="Total de fazendas">
          <span>{data.totalFarms}</span>
        </CardComponent>
        <CardComponent title="Área total">
          <span>{data.totalAcres}</span>
        </CardComponent>
      </div>
      <CardComponent title="Fazendas por estado">
        <Chart data={data.totalByStates} />
      </CardComponent>
      <CardComponent title="Fazendas por cultura">
        <Chart data={data.totalByCrops}
        />
      </CardComponent>
      <CardComponent title="Fazendas por uso de solo">
        <Chart data={[{name: "Agricultável", value: data.totalFreeArea}, {name: "Vegetação", value: data.totalPlantedArea}]} />
      </CardComponent>
    </>
  )
}

export default Home
