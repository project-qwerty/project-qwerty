<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content">
      <IconHeader :major="true" text="About" icon="circle-info" iconColour="var(--primary-colour)" />

      <p>Welcome to Project QWERTY, this is an app for people with aphasia.</p>
      <p>Project QWERTY is an app made by Monash University students and Monash Health Speech Pathologists in partnership with people with aphasia.</p>
      <p>This app is a work in progress.</p>
      <p>We are working on making the app fully functional on all web browsers.</p>

      <IconHeader :major="true" text="FAQs" icon="circle-question" iconColour="var(--primary-colour)" />

      <CollapsibleSection summary="What is Project QWERTY?" >
        <p>Project QWERTY is an app for people with aphasia. It targets spelling and typing through the use of pre-programmed word lists and the option to create custom word lists.</p>
      </CollapsibleSection>

      <CollapsibleSection summary="Nothing happens when I press start. What do I do?" >
        <p>1.	If you are using an iPad, access this app via the Google app.</p>
        <p>OR</p>
        <p>If you are using a computer or other tablet device, access this app via Google Chrome.</p>
        <p>2.Turn off private browsing / incognito mode.</p>
      </CollapsibleSection>

      <CollapsibleSection summary="Who do I contact if I have a question about Project QWERTY?" >
        <p>Please email us at <a href="mailto:projectqwerty2020@gmail.com">projectqwerty2020@gmail.com</a>.</p>
      </CollapsibleSection>

      <CollapsibleSection summary="How do I report an error or bug?" >
        <p>We are sorry you are experiencing an error. Please email us at <a href="mailto:projectqwerty2020@gmail.com">projectqwerty2020@gmail.com</a> with a description and screenshot of the error.</p>
      </CollapsibleSection>
    </div>
  </div>
</template>


<script>
import NavSidebar from '@/components/NavSidebar.vue';
import CollapsibleSection from '@/components/CollapsibleSection.vue';
import IconHeader from '@/components/IconHeader.vue';

export default {
  components: {
    NavSidebar,
    CollapsibleSection,
    IconHeader,
  },
}
</script>


<style scoped>

</style>
