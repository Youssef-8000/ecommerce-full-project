import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface SelectData {
    id:string
    enum: any
    labelName: string
    defValue: string
    formHook: any
}

function FormSelector(data: SelectData) {

  const enumEntries = Object.entries(data.enum)

  const mapEnum = () => {return enumEntries.map((value:any)=><MenuItem key={value[0]} value={value[0]}>{value[1]}</MenuItem>)}

  return (
    <FormControl sx={{minWidth: 240 }}>
        <InputLabel id={data.id}>{data.labelName}</InputLabel>
        <Select
          style={{ width: '500px' }}
          label={data.labelName}
          name={data.labelName}
          defaultValue={data.defValue}
          labelId={data.id}
          id={data.id}
          inputProps={data.formHook}
        >

          {mapEnum()}

        </Select>
        </FormControl>
  )
}

export default FormSelector