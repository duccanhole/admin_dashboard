import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ChartBar(props) {
    const title = props.title;
    const labels = props.labels;
    const data = props.data;
    return (
        <>
            <h3 className='text-center'>{title}</h3>
            <Doughnut
                data={{
                    labels: labels,
                    datasets: [{
                        data: data,
                        borderColor: '#2a2a2a',
                        backgroundColor: [
                            '#EF5350',
                            '#EC407A',
                            '#AB47BC',
                            '#7E57C2',
                            '#5C6BC0',
                            '#42A5F5',
                            '#29B6F6',
                            '#26C6DA',
                            '#26A69A',
                            '#66BB6A',
                            '#9CCC65',
                            '#D4E157',
                            '#FFEE58',
                        ],
                        hoverOffset: 5,
                    }],
                }}
            />
        </>
    )
}