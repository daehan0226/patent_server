import { Schema, model, Model, Document } from 'mongoose';

interface IPatent extends Document {
    "title": string,
    "abstract": string,
    "claim": string,
    "applicant": string,
    "application_number": string,
    "application_date": Date,
    "patent_number": string,
    "patent_date": Date,
    "ipc_original": string,
    "cpc_original": string,
    "legal_status": string,
    "country": string,
    "ipc"?: [],
    "cpc"?: []
}

const PatentSchema: Schema = new Schema({
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    claim: { type: String, required: true },
    applicant: { type: String, required: true },
    application_number: { type: String, required: true },
    application_date: { type: Date, required: true },
    patent_number: { type: String, required: true },
    patent_date: { type: Date, required: true },
    ipc_original: { type: String, required: true },
    cpc_original: { type: String, required: true },
    legal_status: { type: String, required: true },
    country: { type: String, required: true },
    ipc: { type: String },
    cpc: { type: String },
});
const Patent = model('Patent', PatentSchema)

export {
    Patent, IPatent
}