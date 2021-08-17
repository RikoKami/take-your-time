import './App.css';
import dayjs from 'dayjs';
import { useForm, SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useState } from 'react';


type Inputs = {
  dates: {
    start: string,
    end: string
  }[];
};

let renderCount = 0;

function App() {
  const { register, handleSubmit, control, watch } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      dates: [{start: "0", end: "0"}]
    }
  });
  const { fields, remove, append } = useFieldArray({
    name: 'dates',
    control
  })

  const onSubmit: SubmitHandler<Inputs> = data => { 
    console.log(data);
  }

  useEffect(() => {
    renderCount++;
  }, [fields]);

  console.log(watch("dates"));
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
         {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <input defaultValue={field.start} {...register(`dates.${index}.start`)} />
              <input defaultValue={field.end} {...register(`dates.${index}.end`)}/>
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() =>
            append({
              start: `${renderCount}`,
              end: `${renderCount}`,
            })
          }
        >
          Append
        </button>
      </form>
    </div>
  );
}

export default App;
