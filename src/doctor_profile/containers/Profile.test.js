import React from 'react';
import { shallow, mount } from 'enzyme';
import { Profile } from './Profile';
import { IntlProvider } from 'react-intl'

// Since we are using Internationalization, we need to inject an 'intl' context
// object as a prop value to the Component we are going to test. Normally, this
// is obtained by the injectIntl higher order component in the actual application.

const intlProvider = new IntlProvider({ locale: 'en'}, {});
const { intl } = intlProvider.getChildContext();

// This is an example of the data that we receive from the back end. In this test,
// we will NOT test back-end calls or the redux mechanisms. We will simply inject this
// data as props to the component and verify that the data is properly rendered.

const data = [
    {
        "Address1":"69, 2nd Floor, Al-ameen towers, Lal Bagh Main Road",
        "Address2":"Near, Hosur Main Road",
        "Address3":"Sudhama Nagar, Bengaluru",
        "Address4":"Karnataka",
        "AreaName":"HYDERABAD",
        "BusinessPotential":"10000",
        "Category":"ENT",
        "CurrentBusiness":"5000",
        "DOB":"16/05/2019",
        "DOW":"",
        "DSCName":"MADHAIAH  ",
        "DSCQualification":"MBBS",
        "DSCType":"Doctor",
        "DSCcode":"D054205   ",
        "DoctorAge":"35",
        "DoctorEmailId":"Gmail.@c2info.com",
        "DoctorGrade":"PROSPECT",
        "DoctorLandlineNumber":"8067657005",
        "DoctorPrescription":"Yes",
        "DrPurschse":"No",
        "Fscode":"PSR209    ",
        "MobileNumber":"9886312144",
        "NoOfPatientsPerDay":"10",
        "Pincode":"560021",
        "RegistrationNumber":"DL25443",
        "SubareName":"KPHB"
    }
]

describe('The Profile Component (doctor_profile/containers/Profile)', () => {
    it('accepts props and renders them correctly', () => {
        const props = {
            getDoctorDetail:jest.fn(),
            data,
            intl
        }
        const instance = shallow(<Profile {...props} />)
        expect(instance.find('h4').text()).toBe('Doctor Profile')
        expect(instance.state('data')).toEqual(expect.arrayContaining(data))
        //expect(instance).toMatchSnapshot();
    })
});


