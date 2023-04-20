import React, {useState, useEffect, useMemo} from "react";
import carData from "./data";
import "./carData.css"

const CarData = () => {
    const [data, setData] = useState([]);
    const [regionFilter, setRegionFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");
    const [filteredCarData, setFilteredCarData] = useState([]);


    const theads = useMemo(() => {
        let result = [];
        for (const key in data[0]) {
          result.push(key);
        }
        result.shift();
        return result;
      }, [data]);
    
      const modelOptions = useMemo(() => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          result.push(data[i].model);
        }
        result.unshift("all");
        result = [...new Set(result)];
        return result;
      }, [data]);
    
      const regionOptions = useMemo(() => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          result.push(data[i].region);
        }
        result.unshift("all");
        result = [...new Set(result)];
        return result;
      }, [data]);
    
    useEffect(() => {
      const results = [];

      carData.forEach((item) =>{ 
        const existingRegion = results.find((r) => r.region === item.region);

      if (!existingRegion) {
        results.push({
          region: item.region,
          model: item.model,
          sales: item.sales
        });
      }

        results.push(item);
      })
      

      setData(results);
      setFilteredCarData(results);
      setRegionFilter(regionOptions[0]);
      setModelFilter(modelOptions[0]);
    }, [])
    
    useEffect(() => {
      let filteredData = data.filter((item) => {
        if (regionFilter === "all" && modelFilter === "all") {
          return true;
        } else if (regionFilter === "all") {
          return item.model === modelFilter;
        } else if (modelFilter === "all") {
          return item.region === regionFilter;
        } else if (regionFilter !== "all" && modelFilter !== "all") {
          return item.region === regionFilter && item.model === modelFilter;
        }
        return false;
      });
      setFilteredCarData(filteredData);
    }, [regionFilter, modelFilter, data]);

    const handleRegionChange = (e) => {
        setRegionFilter(e.target.value);
      };
    
      const handleModelChange = (e) => {
        setModelFilter(e.target.value);
      };

    return(
        <main>
            <div className="table">
                <div>region</div>
                    <select type="text" value={regionFilter} onChange={handleRegionChange}>
                        {regionOptions.map((item) => {
                          return <option key={item}>{item}</option>
                        })}
                    </select>
                    <div>model</div>
                    <select type="text" value={modelFilter} onChange={handleModelChange}>
                        {modelOptions.map((options) => {
                          return <option key={options}>{options}</option>
                        })}
                    </select>
                <table>
                    <th className="table__row__first">
                        <th className="table__first">Region</th>
                        <th className="table__first">Model</th>
                        <th className="table__first">Sales</th>
                    </th>
                    {/* <thread>
                      <tr>
                        {theads.map((item) =>{
                          return <th className="table__first" key={item}>{item}</th>
                        })}
                      </tr>
                    </thread> */}
                    <tbody>
                    {
                        filteredCarData?.map((car) =>{ return(
                            <th className="table__row">
                                <td className="table__column">{car.region} </td>
                                <td className="table__column">{car.model} </td>
                                <td className="table__column">{car.sales} </td>
                            </th>
                        );
                      })
                    }
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default CarData;