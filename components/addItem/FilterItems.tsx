import { KeyboardEvent } from 'react';
import { TbFilter } from 'react-icons/tb';
import { useRecoilState } from 'recoil';

import { searchedItemsFilterAtom } from '../../atoms/addItem/SearchedItemsFilter';
import CardInput from '../UI/Card/CardInput';
import CardRadioBar from '../UI/Card/CardRadioBar';
import css from './FilterItems.module.css';

const FilterItems = () => {
  const [searchedItemsFilter, setSearchedItemsFilter] = useRecoilState(
    searchedItemsFilterAtom
  );

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    setSearchedItemsFilter((prevState) => {
      return { filter: e.currentTarget.value, type: prevState.type };
    });
  };

  const changeHandler = (value: any) => {
    setSearchedItemsFilter((prevState) => {
      return { filter: prevState.filter, type: value };
    });
  };

  return (
    <div className={`${css.filterItemsContainer} center`}>
      <CardInput
        icon={<TbFilter />}
        displayIcon={true}
        placeholder="Filter Results"
        onInput={handleInput}
      />
      <CardRadioBar
        changeHandler={changeHandler}
        selectedValue={searchedItemsFilter.type}
        values={["ALL", "SET", "MINIFIG"]}
        names={["All", "Set", "Minifigure"]}
      />
    </div>
  );
};

export default FilterItems;
