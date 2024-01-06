import { Col, DatePicker, Form, Input, Row } from 'antd';
import React, { MutableRefObject, useEffect } from 'react';

interface ProductBatchFormProps {
    product: Product;
    onSubmitted?: (data: any) => void;
    formRef?: MutableRefObject<any>;
}

const ProductBatchForm: React.FC<ProductBatchFormProps> = (props) => {
    const { product } = props;
    const form = Form.useForm()[0];

    useEffect(() => {
        if (props.formRef) {
            props.formRef.current = form;
        }
    }, [form, props.formRef]);

    return (
        <>
            <div className='flex-auto'>
                <Form form={form} initialValues={{quantity: product.quantity ? product.quantity : null }}>
                    <div className="flex justify-between flex-wrap gap-4">
                        <Form.Item className='min-w-fit self-stretch mb-0' label="Código del lote" name="code">
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item className='min-w-fit self-stretch mb-0' label="Caducidad" name="expirationDate">
                            <DatePicker></DatePicker>
                        </Form.Item>
                        <Form.Item className='min-w-fit self-stretch mb-0' label="Cantidad" name="quantity">
                            <Input type='number' />
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ProductBatchForm;
