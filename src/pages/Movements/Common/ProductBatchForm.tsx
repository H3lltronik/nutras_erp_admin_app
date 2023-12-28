import { Col, Form, Input, Row } from 'antd';
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
            <h1 className='font-semibold mb-3' style={{fontSize: "1rem"}}>{product.commonName}</h1>
            <Form form={form} initialValues={{quantity: product.quantity ? product.quantity : null }}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="Código del lote" name="code">
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Caducidad" name="expirationDate">
                            <Input type='date' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Cantidad" name="quantity">
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ProductBatchForm;
