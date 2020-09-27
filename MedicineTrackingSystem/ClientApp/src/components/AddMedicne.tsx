import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Medicine } from './RetrieveMedicine';
import Popup from '../Common/popup';

interface AddFetchMedicineState {
    title: string;
    loading: boolean;
    brandList: Array<any>;
    medicineData: Medicine;
    showPopup: boolean;
}

export class AddMedicine extends React.Component<RouteComponentProps<{}>, AddFetchMedicineState> {
    constructor(props: any) {
        super(props);

        this.state = { title: "", loading: true, brandList: [], medicineData: new Medicine(), showPopup: false };

        fetch('https://localhost:44354/medicine/GetBrandList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ brandList: data });
            });

        // This will set state for Add Medicine
        this.setState({ title: "Create", loading: false, brandList: [], medicineData: new Medicine(), showPopup: false });


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.brandList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Medicine</h3>
            <hr />
            {contents}
        </div>;
    }

    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        var isValid = (Math.ceil(Math.abs(new Date(data.get("expiryDate")).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)) < 15);

        {
            isValid ?
                <Popup
                    text='Medicine will expire in less than 15 days should not be allowed to add in the stock'
                    closePopup={this.togglePopup.bind(this)}
                />
                :

                // POST request for Add Medicine.
                (
                    fetch('https://localhost:44354/medicine/AddMedicine', {
                        method: 'POST',
                        body: data,

                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this.props.history.push("/fetchMedicine");
                        })
                )
        }


    }

    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/fetchMedicine");
    }

    private renderCreateForm(brandList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="MedicineId" value={this.state.medicineData.medicineId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.medicineData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="brand">brand</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="brand" defaultValue={this.state.medicineData.brand.brandName} required>
                            <option value="">-- Select brand --</option>
                            {brandList.map(brand =>
                                <option key={brand.brandId} value={brand.brandName}>{brand.brandName}</option>
                            )}
                        </select>
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="price" defaultValue={this.state.medicineData.price.toFixed(2)} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="quantity">Quantity</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="quantity" defaultValue={this.state.medicineData.quantity} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="expiryDate">Expiry Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="expiryDate" required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="notes">Notes</label>
                    <div className="col-md-4">
                        <input className="form-control" type="textarea" name="notes" defaultValue={this.state.medicineData.notes} />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}