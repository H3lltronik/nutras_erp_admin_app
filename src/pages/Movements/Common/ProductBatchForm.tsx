import { DatePicker, Form, Input, Table } from 'antd';
import React, { MutableRefObject, useEffect } from 'react';
import { BatchAPI } from '../../../api';
import moment from 'moment-timezone';

interface ProductBatchFormProps {
    product: Product;
    formRef?: MutableRefObject<any>;
    mode: 'create' | 'select' | 'view';
}

const ProductBatchForm: React.FC<ProductBatchFormProps> = (props) => {
    let { product } = props;
    const form = Form.useForm()[0];

    const [productBatches, setProductBatches] = React.useState<Batch[]>([]);
    const [selectedBatches, setSelectedBatches] = React.useState<Batch[]>([]);

    useEffect(() => {
        if(!product.batches) product.batches = [];
        if (props.formRef) {
            props.formRef.current = form;
            console.log('formRef', props.formRef);
        }

        // Get batches of product from API
        const getProdctBatches = async () => {
            try {
                const batches = await BatchAPI.getProuctBatches(product.id);
                setProductBatches(batches.items ? batches.items : []);
                console.log('batches', batches);
            } catch (error) {
                console.error(`Error getting product batches`, error);
            }
        }

        if(props.mode === 'select'){
            getProdctBatches();
        }
    }, [form, props.formRef]);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Batch[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            product.batches = [...selectedRows];
            setSelectedBatches(selectedRows);
        },
        getCheckboxProps: (record: Batch) => ({
            disabled: false,
            name: record.code,
        }),
    }

    return (
        <>
            {props.mode === 'create' && (
                <>
                    <div className='flex-auto'>
                        <Form form={form} initialValues={{quantity: product.quantity ? product.quantity : null }}>
                            <div className="flex justify-between flex-wrap gap-4">
                                <Form.Item className='min-w-fit self-stretch mb-0' label="Código del lote" name="code">
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item className='min-w-fit self-stretch mb-0' label="Caducidad" name="expirationDate">
                                    <DatePicker
                                        allowClear={false}
                                    ></DatePicker>
                                </Form.Item>
                                <Form.Item className='min-w-fit self-stretch mb-0' label="Cantidad" name="quantity">
                                    <Input type='number' />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </>
            )}
            {props.mode === 'select' && (
                <>
                    <div className='flex justify-between w-full gap-8'>
                        <div className="flex-grow">
                            <h2 className='font-semibold mb-3' style={{fontSize: "1.2rem"}}>Selecciona los lotes</h2>
                            <Table
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                dataSource={productBatches.map((batch) => {
                                    return {
                                        ...batch,
                                        key: batch.id,
                                    }
                                })}
                                columns={[
                                    {
                                        title: 'Código',
                                        dataIndex: 'code',
                                        key: 'code',
                                    },
                                    {
                                        title: 'Caducidad',
                                        dataIndex: 'expirationDate',
                                        key: 'expirationDate',
                                        render(value) {
                                            return value ? moment(value).format('DD/MM/YYYY') : 'Sin caducidad';
                                        },
                                    },
                                    {
                                        title: 'Cantidad',
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                    }
                                ]}
                            ></Table>
                        </div>
                        <div className="flex-grow">
                            <h2 className='font-semibold mb-3' style={{fontSize: "1.2rem"}}>Lotes seleccionados</h2>
                            <Table
                                dataSource={selectedBatches.map((batch) => {
                                    return {
                                        ...batch,
                                        key: batch.id,
                                    }
                                })}
                                columns={[
                                    {
                                        title: 'Código',
                                        dataIndex: 'code',
                                        key: 'code',
                                    },
                                    {
                                        title: 'Caducidad',
                                        dataIndex: 'expirationDate',
                                        key: 'expirationDate',
                                    },
                                    {
                                        title: 'Cantidad',
                                        dataIndex: 'quantity',
                                        key: 'quantity',
                                    }
                                ]}
                            ></Table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductBatchForm;
