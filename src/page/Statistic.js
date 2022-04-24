import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import GeneralInfor from '../component/GeneralInfor';
import ChartBar from '../component/chart/ChartBar';
import ChartDoghnut from '../component/chart/ChartDoghnut';
import { url } from '../api/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Statistic() {
  const [statistic, setStatistic] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/statistic`);
        console.log(res.data.statistic);
        setStatistic(res.data.statistic);
      } catch (e) {
        toast.error("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const nameProduct = statistic.map(item => item.product.name);
  const quantityProduct = statistic.map(item => item.totalQuantity);
  const moneyProduct = statistic.map(item => item.totalMoney);
  return (
    <div className="pt-5 pb-4 tab background">
      <GeneralInfor />
      <div className='m-auto mt-3 p-3 rounded shadow text-light bg-box mx-2'>
        {loading ?
          <div className='text-center'>
            <Spinner animation="border" variant="light" size='sm'/>
             loading information ...
          </div> :
          <div className='row'>
            <div className='col-sm-8'>
              <ChartBar
                title="Revenue (vnd)"
                labels={nameProduct}
                data={moneyProduct}
                datasetLabel="Revenue"
              />
            </div>
            <div className='col-sm-4'>
              <ChartDoghnut
                title="Quantity"
                labels={nameProduct}
                data={quantityProduct}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

