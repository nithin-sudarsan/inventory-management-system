<script>
    import Button from "../shared/Button.svelte";
    import CustomerStores from "../stores/CustomerStores";
    import { createEventDispatcher } from "svelte";
    import shortid from 'shortid';

    let dispatch = createEventDispatcher();
    let valid=false;
    let customer={
        companyName:'', personIncharge:'',email:'',phoneNo:'',address:{
            line1:'',line2:'',city:'',state:'',zipCode:'',country:''
        }
    }
    let errors={
        companyName:'', personIncharge:'',email:'',phoneNo:'',address:{
            line1:'',line2:'',city:'',state:'',zipCode:'',country:''
        }
    }

    const submitHandler=()=>{
        valid = true;
        // Validate Company name
        if (customer.companyName.trim().length < 1){
            valid=false;
            errors.companyName = 'Company name cannot be empty';
        }
        else{
            errors.companyName='';
        }

        // Validate Person name
        if (customer.personIncharge.trim().length < 1){
            valid=false;
            errors.personIncharge = 'Name of person in-charge cannot be empty';
        }
        else{
            errors.personIncharge='';
        }

        // Validate Emailid
        if (customer.email.trim().length < 1){
            valid=false;
            errors.email = 'Email Id cannot be empty';
        }
        else{
            errors.email='';
        }

        // Validate Phone
        if (customer.phoneNo.length !== 10 || !/^\d+$/.test(customer.phoneNo)) {
            valid = false;
            errors.phoneNo = 'Phone number should contain exactly 10 digits';
        } else {
                errors.phoneNo = '';
        }

        // Validate zip code
        if (customer.address.zipCode.length !== 6 || !/^\d+$/.test(customer.address.zipCode)) {
            valid = false;
            errors.address.zipCode = 'Zip Code should contain exactly 6 digits';
        } else {
                errors.address.zipCode = '';
        }

        // Validate line 1
        if (customer.address.line1.trim().length < 1){
            valid=false;
            errors.address.line1 = 'Address line 1 cannot be empty';
        }
        else{
            errors.address.line1='';
        }

        // Validate line 2
        if (customer.address.line2.trim().length < 1){
            valid=false;
            errors.address.line2 = 'Address line 2 cannot be empty';
        }
        else{
            errors.address.line2='';
        }
        // Validate city
        if (customer.address.city.trim().length < 1){
            valid=false;
            errors.address.city = 'City cannot be empty';
        }
        else{
            errors.address.city='';
        }

        // Validate state
        if (customer.address.state.trim().length < 1){
            valid=false;
            errors.address.state = 'State cannot be empty';
        }
        else{
            errors.address.state='';
        }

        // Validate country
        if (customer.address.country.trim() === ""){
            valid=false;
            errors.address.country = 'Please choose a country';
        }
        else{
            errors.address.country='';
        }


        // add new poll if valid true
        if(valid){
            // Generate a unique ID based on the company name
            const uniqueId = generateUniqueId(customer.companyName, customer.phoneNo);
            let customerDetail = { ...customer, id: uniqueId };

            //save poll to store
            CustomerStores.update(currentCustomers=>{
                console.log([customerDetail, ...currentCustomers]);
                return [customerDetail, ...currentCustomers];
            });
            alert("Customer onboarded successfully!");
            dispatch('add');
        }
    };
    const generateUniqueId = (companyName, phoneNo) => {
        const prefix = companyName.substring(0, 3).toUpperCase(); // Take the first 3 characters of the company name
        const postfix =phoneNo.substring(0,4);

        let uniqueId = '';
        do {
            const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a random 5 or 6 digit number
            uniqueId = `${prefix}${randomDigits}`.substring(0, 6); // Concatenate the company name prefix with the random digits and truncate to 6 characters
            uniqueId=`${uniqueId}${postfix}`;
        } while (isIdNotUnique(uniqueId)); // Check if the ID is unique

        return uniqueId;
    };

    const isIdNotUnique = (id) => {
        // Logic to check if the ID already exists in the store or in the list of previously generated IDs
        // Add your logic to check for uniqueness here
        return false; // Placeholder logic; replace with your own uniqueness check
    };
</script>

<div class="onboard-form">
    <h1>Onboard Customer</h1>
    <form on:submit|preventDefault={submitHandler}>
        <div class="half-field left">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Company Name</label>
            <input type="text" bind:value={customer.companyName}>
            <div class="error">{errors.companyName}</div>
        </div>
        <div class="half-field right">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Person in-charge</label>
            <input type="text" bind:value={customer.personIncharge}>
            <div class="error">{errors.personIncharge}</div>
        </div>
        <div class="half-field left">
            <label for="">Email id</label>
            <input type="email" bind:value={customer.email}>
            <div class="error">{errors.email}</div>
        </div>
        <div class="half-field right">
            <label for="">Phone No.</label>
            <input type="text" bind:value={customer.phoneNo}>
            <div class="error">{errors.phoneNo}</div>
        </div>
        <div class="full-field">
            <label for="">Company Address</label>
            <input type="text" placeholder="Address line 1" bind:value={customer.address.line1}>
            <div class="error">{errors.address.line1}</div>
            <input type="text" placeholder="Address line 2" bind:value={customer.address.line2}>
            <div class="error">{errors.address.line2}</div>
            <div class="half-field left">
                <input type="text" placeholder="City" bind:value={customer.address.city}>
                <div class="error">{errors.address.city}</div>
            </div>
            <div class="half-field right">
                <input type="text" placeholder="State" bind:value={customer.address.state}>
                <div class="error">{errors.address.state}</div>
            </div>
            <div class="half-field left">
                <input type="text" placeholder="Postal / Zip Code" bind:value={customer.address.zipCode}>
                <div class="error">{errors.address.zipCode}</div>
            </div>
            <div class="half-field ">
                <select bind:value={customer.address.country}>
                    <option value="">Select Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">Congo, the Democratic Republic of the</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">France, Metropolitan</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                    <option value="Holy See">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia, Federated States of</option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                    <option value="Saint LUCIA">Saint LUCIA</option>
                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                    <option value="Span">Spain</option>
                    <option value="SriLanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <div class="error">{errors.address.country}</div>
            </div>
        </div>
        <!-- <div class="button"> -->
            <Button flat={true} type="secondary">Add Customer</Button>
        <!-- </div> -->
    </form>
</div>

<style>
    form{
        display: flex; justify-content: center; flex-wrap: wrap;
    }
    .onboard-form {
        width: 80%;
        margin: 0 auto;
    }
        .half-field {
            width: 45%;
            float: left;
            box-sizing: border-box;
        }
        .full-field {
            width: 100%;
            clear: both;
            box-sizing: border-box;
            margin-bottom: 15px;
            margin-left: 2.5%;
            margin-right: 2.5%;
        }
        input[type="text"], input[type="email"] {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 10px;
            height: 40px;
            padding-left: 10px;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 15px;
            text-align: left;
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 5%;
        }
        select{
            float:left;
            margin-left: 11%;
            height: 40px;
        }
        .error{
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
        margin-bottom: 5px;
    }
</style>