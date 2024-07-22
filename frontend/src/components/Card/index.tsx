import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import './style.css'

interface ICard {
  title: string;
  children: React.ReactNode;
}

function CardComponent({ title, children }: ICard) {
  return (
    <Card className='card'>
      <CardHeader  title={<Typography variant="h4">{title}</Typography>} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardComponent