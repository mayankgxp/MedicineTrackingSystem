﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchMedicineState {
    medicineList: Medicine[];
    loading: boolean;
}
export class FetchMedicine extends React.Component<RouteComponentProps<{}>, FetchMedicineState> {
    constructor(props: any) {
        super(props);
        this.state = { medicineList: [], loading: true };
        this.handleChange = this.handleChange.bind(this);

        fetch('https://localhost:44354/medicine/GetAllMedicines')
            .then(response => response.json() as Promise<Medicine[]>)
            .then(data => {
                this.setState({ medicineList: data, loading: false });
            });
    }
    handleChange(e) {

        let data = this.state.medicineList.filter((d) => {
            return d.indexOf(e.target.value) !== -1
        });       

        this.setState({ medicineList: data });
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMedicineTable(this.state.medicineList);
        return <div>
            <h1>Medicine Data</h1>
            <p>
                <Link to="/addMedicine">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    
    // Returns the HTML table to the render() method.  
    private renderMedicineTable(medicineList: Medicine[]) {
        return <table className='table'>
            <input type="search" value="" onChange={this.handleChange} />
            <thead>
                <tr>
                    <th></th>
                    <th>Medicine Name</th>
                    <th>Brand</th>
                    <th>Prrice</th>
                    <th>Price</th>
                    <th>Expiry Date</th>
                </tr>
            </thead>
            <tbody>
                {this.state.medicineList.length == 0 ? <div>No Records Found</div> : (medicineList.map(med =>
                    <tr key={med.medicineId} style={med.quantity < 10 ? { background: "yellow" } : (Math.ceil(Math.abs(med.expiryDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)) < 30 ? { background: "red" } : { background: "white" })}>
                        <td>
                            <Link to={{
                                pathname: `/MedicineDetail/${med.medicineId}`
                            }}>
                            {med.name}
                            </Link>
                        </td>
                        <td>{med.brand.brandName}</td>
                        <td>{med.price.toFixed(2)}</td>
                        <td>{med.quantity}</td>
                        <td>{med.expiryDate}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>;
    }
}
export class Medicine {
    medicineId: number = 0;
    name: string = "";
    brand: Brand = new Brand();
    price: number = 0;
    quantity: number = 0;
    expiryDate: Date = new Date();
    notes: string = "";
}
export class Brand {
    brandId: number = 0;
    brandName: string = "";
}