import Dropdown from "./components/Dropdown.tsx";
import Button from "./components/Button.tsx";
import TagBtn from "./components/TagBtn.tsx";
import axios from 'axios';
import {useQuery} from "react-query";
import ListItem from "./components/ListItem.tsx";
import {useState} from "react";
import NavigateBtn from "./components/NavigateBtn.tsx";

async function fetchLodgings(page = 1) {
  const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:sWGvXIXK/yellowstone?page=${page}`;
  const {data} = await axios.get(apiUrl);
  return data;
}


function App() {
  const [page, setPage] = useState(1);
  const {data, isError, isLoading} = useQuery(['lodgings', page],
    () => fetchLodgings(page),
    {keepPreviousData: true}
    );

  if (isLoading) {
    return <h3>Loading...</h3>
  }
  if (isError) {
    return <h3>Loading Error!</h3>
  }
  if (!data) {
    return <h3>No Data</h3>
  }

  function getSeasons(data) {
    const seasons: Set<string> = new Set();
    data.map(season => {
      seasons.add(season.Seasons)
    })
    return Array.from(seasons);
  }

  function getLocations(data) {
    const locations: Set<string> = new Set();
    data.map(city => {
      locations.add(city.Location)
    })
    return Array.from(locations);
  }

  function getCategories(data) {
    const categories: Set<string> = new Set();
    data.map(category => {
      categories.add(category.Category)
    })
    return Array.from(categories);
  }

  const cities = getLocations(data.items);
  const seasons = getSeasons(data.items);
  const category = getCategories(data.items);


  function prevHandler() {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  function nextHandler() {
    setPage((prev) => prev + 1)
  }


  return (
    <>
      <div className="container mx-auto max-w-[73vw] flex flex-col pt-10">
        <div className='flex justify-between'>
          <div className="flex">
            <Dropdown
              title='Season'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={seasons} />
            <Dropdown
              title='Location'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={cities} />
            <Dropdown
              title='Type'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={category} />
            <Dropdown
              title='Sort by'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={[]} />
          </div>
          <Button title={'Map'} icon='./assets/map.svg' fill='solid' />
        </div>
        <div className='flex items-center my-[1.5vw]'>
          <TagBtn tagName='Madison' icon='./assets/close.svg' />
          <div className='ml-4'>
            <Button title='Clear All' fill='ghost' />
          </div>
        </div>
        <div className='flex flex-col'>
          {data.items.map(el => {
              return (
                <ListItem
                  id={el.id}
                  key={el.id}
                  phone={el.Phone}
                  name={el.Name}
                  city={el.City_State_ZIP}
                  address={el.Address}
                  website={el.Website}
                  image={el.Image}
                  advertiser={el.Advertiser}
                />
              )
            }
          )}
        </div>
        <div className='flex mx-auto my-10'>
          <NavigateBtn onClick={prevHandler} page={page}>{'< Previous'}</NavigateBtn>
          <NavigateBtn onClick={nextHandler}>{'Next >'}</NavigateBtn>
        </div>
      </div>
    </>
  )
}

export default App
