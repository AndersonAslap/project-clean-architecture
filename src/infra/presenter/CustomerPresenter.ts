import { toXML } from 'jstoxml'

export class CustomerPresenter {

    static toXML(data: Output): string {
        const xmlOptions = {
            header: true,
            indent: ' ',
            newline: '\n',
            allowEmpty: true
        }
        return toXML({
            customers: {
                customer: data.map((customer) => (
                    {
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zip: customer.address.zip,
                            state: customer.address.state
                        }
                    }
                ))
            }
        }, xmlOptions)
    }
}

type Output = Array<
    {
        id: string
        name: string 
        address: {
            street: string,
            number: number,
            zip: string,
            state: string
        } 
    }
>