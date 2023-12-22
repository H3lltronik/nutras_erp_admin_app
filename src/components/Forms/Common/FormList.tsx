import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface FormListProps {
  renderForm: (ref: React.RefObject<any>) => React.ReactNode;
  getFormData: (formHandle: any) => Promise<any>;
  title?: string;
  itemClassName?: string;
}

export interface FormListHandle {
  getAllFormsData: () => Promise<any[]>;
}

export const FormList = forwardRef<FormListHandle, FormListProps>(
  (props: FormListProps, ref: React.Ref<any> | undefined) => {
    const { renderForm, getFormData } = props;
    const [formRefs, setFormRefs] = useState<React.RefObject<any>[]>([]);

    useImperativeHandle(ref, () => ({
      getAllFormsData: async () => {
        console.log("get all forms data");
        return await Promise.all(
          formRefs.map((ref) =>
            ref.current ? getFormData(ref.current) : Promise.resolve(null)
          )
        );
      },
    }));

    const addForm = () => {
      setFormRefs((prev) => [...prev, React.createRef()]);
    };

    const removeForm = (index: number) => {
      setFormRefs((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="w-full">
        <div className="flex items-center mb-5 gap-2">
          <Button
            className="bg-green-600 text-white hover:bg-green-50"
            icon={<PlusCircleFilled />}
            onClick={addForm}>
            <span>{props.title}</span>
          </Button>
          <hr className="w-full" />
        </div>
        {formRefs.map((ref, index) => (
          <Row
            key={index}
            className={" pl-3 bg-gray-100 p-1 my-2 " + props.itemClassName}>
            <Col span={24}>
              <div className="flex items-center">
                <Button
                  className="bg-red-500 mr-3"
                  icon={<DeleteFilled className="text-white" />}
                  shape="circle"
                  onClick={() => removeForm(index)}
                />
                <hr className="w-full" />
              </div>
              {renderForm(ref)}
            </Col>
          </Row>
        ))}
      </div>
    );
  }
);
