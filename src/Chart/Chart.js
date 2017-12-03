import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './Chart.css';
import Button from '../Button/Button';

const Chart = (props) => {
  const comparedLocations = props.cards.filter( card => {
    return Object.keys(card)[0] === props.comparisons[0] || Object.keys(card)[0] === props.comparisons[1];
  });

  const location1 = Object.assign({}, 
    {district: Object.keys(comparedLocations[0])[0]}, 
    {scores: Object.values(comparedLocations[0][Object.keys(comparedLocations[0])[0]])}, 
    {dates: Object.keys(comparedLocations[0][Object.keys(comparedLocations[0])[0]])}
  );

  const location2 = 
    Object.assign({}, 
      {district: Object.keys(comparedLocations[1])[0]}, 
      {scores: Object.values(comparedLocations[1][Object.keys(comparedLocations[1])[0]])}, 
      {dates: Object.keys(comparedLocations[1][Object.keys(comparedLocations[1])[0]])}
    );

  const mappedDates = location1.dates.map( (date, index) => {
    if (location1.dates.length > 10) {
      return <li style={{width: 600/location1.dates.length + 'px', ['font-size']: '10px'}} key={index}>{date}</li>;
    } else {
      return <li style={{width: 600/location1.dates.length + 'px'}} key={index}>{date}</li>;
    }
  });

  let dataMax = 0;
  location1.scores.forEach( score => {
    if (score > dataMax) {
      dataMax = score;
    }
  });

  location2.scores.forEach( score => {
    if (score > dataMax) {
      dataMax = score;
    }
  });

  dataMax = Math.max(1, dataMax);

  return (
    <div className="Chart">
      <div className="chart-container">
        <div className="axis">
          <span>0</span>
          <span>{dataMax}</span>
        </div>
        <Sparklines height={50} width={100} max={dataMax} min={0} data={location1.scores}>
          <SparklinesLine color="red" style={{fill: 'none'}}/>
        </Sparklines>
        <Sparklines height={50} width={100} max={dataMax} min={0} data={location2.scores}>
          <SparklinesLine color="blue" style={{fill: 'none'}}/>
        </Sparklines>
      </div>
      <div className="chartNav">
        <h5>{location1.district}<div className="district1key"></div></h5>
        <h5>{location2.district}<div className="district2key"></div></h5>
        <Button type="chart-close" name="Close" chartStatus={props.chartStatus}/>
      </div>
      <ul>
        {mappedDates}
      </ul>
    </div>
  );
};

export default Chart;