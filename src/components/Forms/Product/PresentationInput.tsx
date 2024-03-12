import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

interface PresentationInputValue {
  number?: string;
  unit?: string;
}

interface PresentationInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const PresentationInput: React.FC<PresentationInputProps> = ({
  value = "",
  onChange,
}) => {
  const [number, setNumber] = useState<string>("");
  const [unit, setUnit] = useState<string>("g");

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(g|Kg|L|Pz)$/);
    if (match) {
      setNumber(match[1]);
      setUnit(match[2]);
    }
  }, [value]);

  const triggerChange = (newNumber: string, newUnit: string) => {
    onChange?.(`${newNumber}${newUnit}`);
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    if (!isNaN(+newNumber)) {
      // Validate the input is numeric
      setNumber(newNumber);
      triggerChange(newNumber, unit);
    }
  };

  const onUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    triggerChange(number, newUnit);
  };

  return (
    <Input.Group compact>
      <Input
        style={{ width: "calc(100% - 60px)" }}
        value={number}
        onChange={onNumberChange}
        placeholder="Cantidad"
      />
      <Select value={unit} onChange={onUnitChange} style={{ width: 60 }}>
        <Option value="g">g</Option>
        <Option value="Kg">Kg</Option>
        <Option value="L">L</Option>
        <Option value="Pz">Pz</Option>
      </Select>
    </Input.Group>
  );
};
