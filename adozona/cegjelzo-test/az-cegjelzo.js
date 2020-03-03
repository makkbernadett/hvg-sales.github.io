(function () {
    //DEV
    let BASE_URL = 'https://dev.api.cegjelzo.com/api/v2/';
    //let BASE_URL = 'http://me.adozona.hu/api/Cegjelzo/';
    Vue.component("bar", {
        props: ['searchresultprop', 'issearchlist'],
        mounted: function () {
        },
        computed: {
            companyDetails: function () {
                let companyDetails = this.searchresultprop[0]
                return companyDetails
            }
        },
        template: `
	<div id='resultitem' >
		<button class="button-back" @click="stepBack()" v-if="issearchlist"><i class="material-icons">chevron_left</i> vissza a találati listára</button>
		<div class="resultItem resultItemDetails" v-if="companyDetails">
			<!--{{searchresultprop}}-->
			<!--{{companyDetails}}-->
			<div v-if="companyDetails.type === 'companies'">
				<h2 class="company-title">{{companyDetails.long_name[0].name}}</h2>
				<div class="resultItemContent" >

					<div class="company-result-item">
						<div class="company-result-row">
							<strong class="company-result-row_title">Cég hosszú neve</strong>
							<div class="company-result-row_data" >
								<div v-for="(long_name, index) in companyDetails.long_name" :key="index">
									{{long_name.name}}
								</div>
							</div>
						</div>



						<div class="company-result-row" v-if="companyDetails.short_name.length > 0">
							<strong class="company-result-row_title">Cég rövid neve</strong>
							<div class="company-result-row_data" >
								<div v-for="(short_name, index) in companyDetails.short_name" :key="index">
									{{short_name.name}}
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Székhely</strong>
							<div class="company-result-row_data" >
								<div v-for="(address, index) in companyDetails.address" :key="index">
									{{address.address}}
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Cégjegyzékszám</strong>
							<div class="company-result-row_data" >
								<div v-for="(company_registration_number, index) in companyDetails.company_registration_number" :key="index">
									{{company_registration_number.company_registration_number}} <small v-if="company_registration_number.court">({{company_registration_number.court}} {{company_registration_number.insertion}})</small>
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Adószám</strong>
							<div class="company-result-row_data" >
								<div v-for="(tax_number, index) in companyDetails.tax_number" :key="index">
									{{tax_number.tax_number}}
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Főtevékenység</strong>
							<div class="company-result-row_data" >
								<div v-for="(main_activities, index) in companyDetails.main_activities" :key="index">
									{{main_activities.nace_name}} <small v-if="main_activities.change">({{main_activities.change}})</small>
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Alapító okirat kelte</strong>
							<div class="company-result-row_data" >
								<div v-for="(constituent_document_date, index) in companyDetails.constituent_document_date" :key="index">
									<span>{{constituent_document_date.constituent_document}}</span><br />
								</div>
							</div>

						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Cég státusza</strong>
							<div class="company-result-row_data">
								{{getType('status', companyDetails.status)}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Jegyzett tőke</strong>
							<div class="company-result-row_data">
								<div v-for="(registered_capital, index) in companyDetails.registered_capital" :key="index">
									<span v-for="(capital, index) in registered_capital.capital">
										{{capital.title}}:  {{capital.amount.toLocaleString()}} {{capital.currency}}<br />
									</span>

								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Eljárások</strong>
							<div class="company-result-row_data">
								{{getType('proceedings', companyDetails.pending_proceedings)}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Bankszámlaszám</strong>
							<div class="company-result-row_data">
								<div v-for="(bank_accounts, index) in companyDetails.bank_accounts" :key="index"  v-if="companyDetails.bank_accounts.length > 0">
									<strong>{{bank_accounts.bank_account}}</strong> <small>({{bank_accounts.bank_name}})</small><br />
									Számlanyitás ideje: {{bank_accounts.insertion}}<br />
								</div>
								<div v-else>
									-
								</div>
							</div>

						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Elektronikus elérhetőségek</strong>
							<div class="company-result-row_data" >
								<div  v-for="(emails_and_webpages, index) in companyDetails.emails_and_webpages" :key="index">
									<span v-if="emails_and_webpages.webpage">
										Weboldal: <strong>{{emails_and_webpages.webpage}}</strong><br />
									</span>
									<span v-if="emails_and_webpages.email">
										Email cím: <strong>{{emails_and_webpages.email}}</strong><br />
									</span>
									<span v-if="emails_and_webpages.delivery_email">
										Értesítési email cím: <strong>{{emails_and_webpages.delivery_email}}</strong><br />
									</span>
									<span v-if="emails_and_webpages.insertion">
										Bejegyzés kelte: {{emails_and_webpages.insertion}}<br />
									</span>
									<span v-if="emails_and_webpages.change">
										Változás időpontja: {{emails_and_webpages.change}}<br />
									</span>

								</div>

							</div>
						</div>
					</div>


				</div>
			</div>
			<div v-else-if="companyDetails.type === 'civil_orgs'">

				<h2 class="company-title">{{companyDetails.long_name}} - {{getType('type', companyDetails.type)}}</h2>
				<div class="resultItemContent" >

					<div class="company-result-item">

						<div class="company-result-row">
							<strong class="company-result-row_title">Regisztrációs szám</strong>
							<div class="company-result-row_data">
								{{companyDetails.registration_number}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Név</strong>
							<div class="company-result-row_data">
								{{companyDetails.long_name}}<br />
								Rövidített név: {{companyDetails.short_name}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Székhely</strong>
							<div class="company-result-row_data">
								{{companyDetails.address}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Civilszervezet státusza</strong>
							<div class="company-result-row_data">
								{{companyDetails.status}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Bejegyzés dátuma</strong>
							<div class="company-result-row_data">
								{{companyDetails.insertion}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Alapítás dátuma</strong>
							<div class="company-result-row_data">
								{{companyDetails.constituent_document_date}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Civilszervezet tevékenysége</strong>
							<div class="company-result-row_data">
								{{companyDetails.activity}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Közhasznúsági fokozat</strong>
							<div class="company-result-row_data">
								{{companyDetails.level_of_charity}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Tevékenység leírása</strong>
							<div class="company-result-row_data">
								{{companyDetails.description}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Adószám</strong>
							<div class="company-result-row_data">
								{{companyDetails.tax_number}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Bankszámlaszám</strong>
							<div class="company-result-row_data" >
								<span  v-if="companyDetails.bank_accounts.length > 0">{{companyDetails.bank_accounts}}</span>
								<span v-else>-</span>
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">A szervezet képviselő(i)</strong>
							<div class="company-result-row_data" >
								<div v-for="(representative, index) in companyDetails.representatives" :key="index">
									{{representative.name}} - {{representative.title}}<br />
									Megbízás időtartama	: {{representative.duration_of_mandate}} | Megbízás kezdete: {{representative.change}}
								</div>
							</div>
						</div>

						<div class="company-result-row"  v-if="companyDetails.leading_orgs.length > 0">
							<strong class="company-result-row_title">Alapítvány ügyvezető szervek lista</strong>
							<div class="company-result-row_data" >
								<div v-for="(leading_org, index) in companyDetails.leading_orgs" :key="index">
									{{leading_org.member_name}} - {{leading_org.org_name}}<br />
									Megbízás kezdete: {{leading_org.change}}
								</div>
							</div>
						</div>

					</div>
				</div>

			</div>
			<div v-else-if="companyDetails.type === 'self_employed'">
				<h2 class="company-title">{{companyDetails.name}} - {{getType('type', companyDetails.type)}}</h2>
				<div class="resultItemContent" >

					<div class="company-result-item">

						<div class="company-result-row">
							<strong class="company-result-row_title">Egyéni vállalkozó neve</strong>
							<div class="company-result-row_data">
								{{companyDetails.name}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">KSH szám</strong>
							<div class="company-result-row_data">
								{{companyDetails.ksh_num}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Nyilvántartási szám</strong>
							<div class="company-result-row_data">
								{{companyDetails.registration_num}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Tevékenység</strong>
							<div class="company-result-row_data" >
								<div v-for="(activity, index) in companyDetails.main_activities" :key="index">
									{{activity.teaor_num}} - {{activity.teaor_name}}<br />
									Hatály kezdete: {{activity.change}}
								</div>
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Státusz</strong>
							<div class="company-result-row_data">
								{{companyDetails.status}}
							</div>
						</div>


						<div class="company-result-row">
							<strong class="company-result-row_title">Adószám</strong>
							<div class="company-result-row_data">
								{{companyDetails.tax_number}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Indulás dátuma</strong>
							<div class="company-result-row_data">
								{{companyDetails.start_date}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Cím</strong>
							<div class="company-result-row_data" >
								<div v-for="(address, index) in companyDetails.address" :key="index">
									{{address.address_type}}: {{address.address}}<br />
									Hatály kezdete: {{address.change}}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div v-else-if="companyDetails.type === 'budget_orgs'">
				<h2 class="company-title">{{companyDetails.name}} - {{getType('type', companyDetails.type)}}</h2>
				<div class="resultItemContent" >

					<div class="company-result-item">
						<div class="company-result-row">
							<strong class="company-result-row_title">Név</strong>
							<div class="company-result-row_data">
								{{companyDetails.name}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Székhely</strong>
							<div class="company-result-row_data">
								{{companyDetails.address}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Alaptevékenység fő TEÁOR kódja</strong>
							<div class="company-result-row_data">
								{{companyDetails.main_activity}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Adószám</strong>
							<div class="company-result-row_data">
								{{companyDetails.tax_number}}
							</div>
						</div>

						<div class="company-result-row">
							<strong class="company-result-row_title">Közoktatási OM azonosító</strong>
							<div class="company-result-row_data">
								{{companyDetails.om_id ? companyDetails.om_id : '-'}}
							</div>
						</div>
						<div class="company-result-row">
							<strong class="company-result-row_title">Cím</strong>
							<div class="company-result-row_data" >
								<div v-for="(founders_right_owner, index) in companyDetails.founders_right_owner" :key="index">
									{{founders_right_owner}}
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>

	</div>
	`,
        methods: {
            stepBack () {
                this.$parent.result = false;
                this.$parent.resultList = true;
            }
        }
    });

    Vue.component("resultlist", {
        props: ['searchresultprop', 'showresult'],
        template: `
	<div id='resultlist' class='resultList'>
		<h3>Találatok<span>Összesen {{searchresultprop.length}} találat</span></h3>

		<div class="resultListItem" v-for="(result, index) in searchresultprop" @click="showresult(result.full_tax_number, 'result-list', result.name)">
			<h2 class="resultTitle"><span>{{result.name}}</span><span><button>Részletek <i class="material-icons">add_circle_outline</i></button></span></h2>
			<p><strong>Székhely:</strong> {{result.address}} </p>
			<p><strong>Adószám:</strong> {{result.full_tax_number}}  </p>
			<p><strong>Cégtípus:</strong> {{getType('type', result.collection)}}  </p>
		</div>
	</div>
	`
    });

    Vue.component('autocomplete', {
        props: {
            placeHolderText: String,
            onKeyUp: Function,
            onEnter: Function,
            onSelected: Function,
            resultItems: Array,
            autoCompleteProgress: Boolean,
            itemId: String
        },

        data() {
            return {
                keywordSearch: ''
            }
        },
        template: `
		<div class="cegjelzo-container_form">
			<div class="autocomplete">
				<input type="text" :placeholder="placeHolderText" v-on:keyup.enter="onEnter(keywordSearch);keywordSearch='';" v-model="keywordSearch" class="form-textinput" :class="{ 'loading-circle' : (keywordSearch.length > 3), 'hide-loading-circle': resultItems.length > 0 || resultItems.length == 0 && !autoCompleteProgress  }" v-on:input="!autoCompleteProgress ? onKeyUp(keywordSearch) : ''"/>
				<ul class="autocomplete-results" v-if="resultItems.length > 0">
					<li class="autocomplete-result" v-for="(item,i) in resultItems" :key="i" @click="keywordSearch='';onSelected(item.full_tax_number, 'autocomplete-list', item.name)">
						{{ item.name }}
						<small>({{ item.full_tax_number }})</small>
					</li>
				</ul>
			</div>
			<button @click="onEnter(keywordSearch);keywordSearch='';"><i class="material-icons">search</i></button>

		</div>
	`

    });

    Vue.mixin({
        methods: {
            getType (key, subkey) {
                let types = {
                    'type':
                        {
                            'companies': 'cég',
                            'civil_orgs': 'civil szervezet',
                            'self_employed': 'egyéni vállalkozó',
                            'budget_orgs': 'költségvetési szerv'
                        },
                    'status':
                        {
                            'Active': 'aktív',
                            'Inactive': 'inaktív'
                        },
                    'proceedings': {
                        true: 'eljárás alatt',
                        false: 'nincs eljárás alatt'
                    }
                }
                return types[key][subkey]
            }
        }
    })
    const azCegjelzoApplication = new Vue({
        el: '#cegjelzoApplication',
        created: function () {
        },
        updated: function () {
        },
        mounted: function () {
        },
        data: {
            searchResultItem: [],
            searchResult: [],
            placeHolderInputText: 'Keressen cégnév, adószám alapján',
            autoCompleteResult: [],
            autoCompleteProgress: false,
            autoCompleteFieldId: "azCegjelzoSearch",
            result: false,
            resultList: false,
            resultSource: null,
            cegjelzoHeaders: {
                'X-Api-Key': 'M2U5wZCGNz25w5YiiwQHN7SHZD80qogk2HGAVrli',
                'X-Client-Id': 'HVG-00001',
                'X-Customer-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSFZHIiwiZGF0ZSI6IjIwMTktMDgtMjIiLCJ2ZXIiOiJ2MiIsImtleSI6Ik0yVTV3WiIsImVuZHBudHMiOlsic2VhcmNoIiwiYXV0b2NvbXBsZXRlIl0sImNtcF9mbGRzIjpbImxvbmdfbmFtZSIsInNob3J0X25hbWUiLCJhZGRyZXNzIiwiY29tcGFueV9yZWdpc3RyYXRpb25fbnVtYmVyIiwidGF4X251bWJlciIsIm1haW5fYWN0aXZpdGllcyIsImNvbnN0aXR1ZW50X2RvY3VtZW50X2RhdGUiLCJzdGF0dXMiLCJzdGF0dXNfY29kZSIsInJlZ2lzdGVyZWRfY2FwaXRhbCIsInBlbmRpbmdfcHJvY2VlZGluZ3MiLCJmaW5pc2hlZF9wcm9jZWVkaW5ncyIsImJhbmtfYWNjb3VudHMiLCJlbWFpbHNfYW5kX3dlYnBhZ2VzIl0sImN2bF9mbGRzIjpbInJlZ2lzdHJhdGlvbl9udW1iZXIiLCJsb25nX25hbWUiLCJzaG9ydF9uYW1lIiwiYWRkcmVzcyIsInN0YXR1cyIsInN0YXR1c19jb2RlIiwidHlwZSIsImluc2VydGlvbiIsImNvbnN0aXR1ZW50X2RvY3VtZW50X2RhdGUiLCJhY3Rpdml0eSIsImxldmVsX29mX2NoYXJpdHkiLCJkZXNjcmlwdGlvbiIsInRheF9udW1iZXIiLCJyZXByZXNlbnRhdGl2ZXMiLCJsZWFkaW5nX29yZ3MiLCJiYW5rX2FjY291bnRzIiwicHJvY2VlZGluZ3MiXSwic2VfZmxkcyI6WyJuYW1lIiwidGF4X251bWJlciIsImtzaF9udW0iLCJyZWdpc3RyYXRpb25fbnVtIiwibWFpbl9hY3Rpdml0aWVzIiwic3RhdHVzIiwic3RhdHVzX2NvZGUiLCJzdGFydF9kYXRlIiwiZW5kX2NhdXNlIiwiZW5kX2RhdGUiLCJhZGRyZXNzIl0sImJkZ19mbGRzIjpbInJlZ2lzdGVyX2lkIiwibmFtZSIsImFkZHJlc3MiLCJtYWluX2FjdGl2aXR5IiwidGF4X251bWJlciIsIm9tX2lkIiwiZm91bmRlcnNfcmlnaHRfb3duZXIiXX0.LiynE_Y6lg67vN38B7ahleSs4qMzbGRzo5e5eDOmte4'
            },
            baseShowLegals: false,
            baseShowHowTo: false


        },
        computed: {
            computedResults: function () {
                return this.searchResultItem
            },
            isSearchList: function () {
                if (this.resultSource === 'result-list') {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            onSelectedAutoCompleteEvent(id, source, name) {

                this.autoCompleteProgress = true;
                this.autoCompleteResult = [];
                if (id === 'NULL') {
                    id = name;
                }
                //DEV
                axios.get(BASE_URL + "search?value=" + id, {
                //axios.get(BASE_URL + "GetSearchResult?value=" + id, {

                    headers: this.cegjelzoHeaders
                })
				.then(response => {
				    this.searchResultItem = response.data
				    this.result = true
				    this.resultList = false
				    this.resultSource = source
				    setTimeout(() => this.autoCompleteProgress = false, 100);

				})
				.catch(e => {

				})

            },

            onKeyUpAutoCompleteEvent(keywordEntered) {

                this.autoCompleteResult = [];
                this.autoCompleteProgress = false;
                if (keywordEntered.length > 2) {
                    this.autoCompleteProgress = true;

                    //DEV
                    axios.get(BASE_URL + "autocomplete?search=" + keywordEntered, {
                    //axios.get(BASE_URL + "GetAutocompleteResult?search=" + keywordEntered, {

                        headers: this.cegjelzoHeaders
                    })
					.then(response => {
					    var newData = [];
					    response.data.result.forEach(function (item, index) {
					        if (item.name.toLowerCase().indexOf(keywordEntered.toLowerCase()) >= 0) {
					            newData.push(item);
					        }
					    });
					    this.autoCompleteResult = newData;
					    setTimeout(() => this.autoCompleteProgress = false, 100);

					})
					.catch(e => {
					    setTimeout(() => this.autoCompleteProgress = false, 100);
					    this.autoCompleteResult = [];
					})
                } else {
                    setTimeout(() => this.autoCompleteProgress = false, 100);
                    this.autoCompleteResult = [];
                }
            },
            onEnterEvent (keywordEntered) {

                this.autoCompleteProgress = false;
                this.autoCompleteResult = [];
                if (keywordEntered.length > 2) {
                    this.autoCompleteProgress = true;

                    //DEV 
                    axios.get(BASE_URL + "autocomplete?search=" + keywordEntered, {
                    //axios.get(BASE_URL + "GetAutocompleteResult?search=" + keywordEntered, {

                        headers: this.cegjelzoHeaders
                    })
					.then(response => {
					    var newData = [];
					    response.data.result.forEach(function (item, index) {
					        if (item.name.toLowerCase().indexOf(keywordEntered.toLowerCase()) >= 0) {
					            newData.push(item);
					        }
					    });
					    this.searchResult = newData;
					    this.autoCompleteResult = [];
					    setTimeout(() => this.autoCompleteProgress = false, 100);
					    this.result = false
					    this.resultList = true
					})
					.catch(e => {
					    setTimeout(() => this.autoCompleteProgress = false, 100);
					    this.autoCompleteResult = [];
					    this.searchResult = [];
					})
                } else {
                    setTimeout(() => this.autoCompleteProgress = false, 100);
                    this.autoCompleteResult = [];
                    this.searchResult = [];
                }
            },
            toggleView(view) {
                this.view = !this.view
                console.log(view, this.view)
            }
        }
    });
})();