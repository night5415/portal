<template>
  <v-data-table :headers="headers" :items="dataList" :loading="gridLoading">
    <v-progress-linear slot="progress" height="3" v-model="dataProgress"></v-progress-linear>
    <template v-slot:items="props">
      <td>{{ props.item.InvoiceDate | formatDate }}</td>
      <td>{{ props.item.ParticipantFirstName }}</td>
      <td>{{ props.item.InvoiceActivityGroupDatesOfService | formatDate }}</td>
      <td>{{ props.item.ParticipantAmount | formatCurrency }}</td>
      <td>{{ props.item.ParticipantDue | formatCurrency}}</td>
      <td>
        <portal-download
          v-bind:fileName="props.item.InvoiceNumber"
          fileType="pdf"
          v-bind:url="`~api/invoice/${props.item.InvoiceId}/invoicepdfdirect`"
        />
      </td>
      <td>{{ props.item.InvoiceStatus }}</td>
    </template>
  </v-data-table>
</template> 
<script>
import { invoiceApi } from "@/custom_modules/PathData";
export default {
  name: "invoice",
  mounted() {
    let self = this,
      list = self.$data.dataList;
    if (list && list.length === 0) {
      self.loadData();
    }
  },
  data() {
    return {
      dataList: [],
      dataProgress: 0,
      gridLoading: false,
      headers: [
        { text: "Invoice Date", value: "InvoiceDate" },
        { text: "Patient", value: "" },
        { text: "Date of Service", value: "" },
        { text: "Inv. Tot.", value: "ParticipantAmount" },
        { text: "Patient Due", value: "" },
        { text: "File", value: "" },
        { text: "Status", value: "InvoiceStatus" }
      ]
    };
  },
  methods: {
    loadData() {
      let self = this;
      self.$data.gridLoading = true;
      invoiceApi
        .cacheFirst(self)
        .catch(err => {
          console.log("invoice vue", err);
        })
        .finally(function() {
          self.$data.dataProgress = 100;
          setTimeout(() => {
            self.$data.gridLoading = false;
            self.$data.dataProgress = 0;
          }, 1000);
        });
    }
  }
};
</script>

<style>
</style>
