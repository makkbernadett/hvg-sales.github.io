<template>
  <div id='resultitem' >
    <button class="button-back" @click="stepBack()" v-if="issearchlist"><i class="material-icons">chevron_left</i> vissza a találati listára</button>
    <div class="resultItem resultItemDetails" v-if="companyDetails">
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
                  <span v-for="(capital, index) in registered_capital.capital" :key="'cr_' + index">
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
              <div class="company-result-row_data" v-if="companyDetails.bank_accounts.length > 0">
                <div v-for="(bank_accounts, index) in companyDetails.bank_accounts" :key="index"  >
                  <strong>{{bank_accounts.bank_account}}</strong> <small>({{bank_accounts.bank_name}})</small><br />
                  Számlanyitás ideje: {{bank_accounts.insertion}}<br />
                </div>
              </div>
              <div class="company-result-row_data"  v-else>
                -
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
                  Megbízás időtartama: {{representative.duration_of_mandate}} | Megbízás kezdete: {{representative.change}}
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
</template>
<script>
export default {
  props: ['searchresultprop', 'issearchlist'],
  mounted: function () {
  },
  computed: {
    companyDetails: function () {
      let companyDetails = this.searchresultprop[0]
      return companyDetails
    }
  },
  methods: {
    stepBack () {
      this.$parent.result = false
      this.$parent.resultList = true
    }
  }
}
</script>
