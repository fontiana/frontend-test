import { useState, ChangeEvent } from "react";
import { useExchangeInfo } from "../../context/useExchangeInfo";
import * as S from "./styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { ACTION_TYPE } from "../../context/useExchangeInfo/actions";
import ExchangeTable from "./components/ExchangeTable";

type Inputs = {
  listName: string;
  listOfExchanges: string;
};

const ListSymbols = () => {
  const [showAddNewList, setShowAddNewList] = useState(false);

  const { exchanges, dispatchExchanges } = useExchangeInfo();
  const [selectedOption, setSelectedOption] = useState(exchanges.currentList);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatchExchanges({
      type: ACTION_TYPE.ADD_NEW_LIST,
      payload: data.listName,
    });

    setShowAddNewList(false);
  };

  const showForm = () => setShowAddNewList(true);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatchExchanges({
      type: ACTION_TYPE.ALTER_CURRENT_LIST,
      payload: e.target.value,
    });

    setSelectedOption(e.target.value);
  };

  return (
    <S.Wrapper>
      <S.WrapperOfListUser>
        <S.WrapperNewList>
          <label htmlFor="listOfExchanges">Select a list:</label>
          <S.SelectList
            id="listOfExchanges"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {Object.keys(exchanges.lists).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </S.SelectList>
          <S.ButtonAddList onClick={showForm}>+</S.ButtonAddList>
        </S.WrapperNewList>
        {showAddNewList && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.WrapperNewList>
              <S.Field {...register("listName")} />
              <S.Button value="Add" />
            </S.WrapperNewList>
          </form>
        )}
      </S.WrapperOfListUser>

      <ExchangeTable />
    </S.Wrapper>
  );
};

export default ListSymbols;
