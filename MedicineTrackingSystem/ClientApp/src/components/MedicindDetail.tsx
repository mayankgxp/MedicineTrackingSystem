import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Medicine } from './RetrieveMedicine';

interface FetchMedicineState {
    medicineData: Medicine;
    loading: true;
}
export class MedicineDetail extends React.Component<RouteComponentProps<{}>, FetchMedicineState> {
    constructor(props: any) {
        super(props);

        this.state = { medicineData: new Medicine(), loading: true };

        var medicineId = this.props.match.params["id"];


        fetch('https://localhost:44354/medicine/GetMedicineById/' + medicineId)
            .then(response => response.json() as Promise<Medicine>)
            .then(data => {
                this.setState({ medicineData: data, loading: false });
            });

        this.handleBack = this.handleBack.bind(this);

    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.medicineData.name}</h1>
            <h3>Medicine</h3>
            <hr />
            {contents}
        </div>;
    }

   
    private handleBack(e: any) {
        e.preventDefault();
        this.props.history.push("/fetchMedicine");
    }

    private renderCreateForm() {
        return (
            <div>
                <div className="form-group row" >
                    <input type="hidden" name="MedicineId" value={this.state.medicineData.medicineId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <span className="form-control" defaultValue={this.state.medicineData.name} />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="brand">brand</label>
                    <div className="col-md-4">
                        <span className="form-control" defaultValue={this.state.medicineData.brand.brandName} />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="quantity">Quantity</label>
                    <div className="col-md-4">
                        <span className="form-control" defaultValue={this.state.medicineData.quantity} />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="expiryDate">Expiry Date</label>
                    <div className="col-md-4">
                        <span className="form-control" defaultValue={this.state.medicineData.expiryDate.toString()} />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="notes">Notes</label>
                    <div className="col-md-4">
                        <span className="form-control" defaultValue={this.state.medicineData.notes} />
                    </div>
                </div >
                <div className="form-group">
                    <button className="btn" onClick={this.handleBack}>Back To List</button>
                </div >
            </div >
        )
    }
}