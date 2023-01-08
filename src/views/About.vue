<template>
  <Nav>
    <IconHeader :major="true" text="About" icon="circle-info" iconColour="var(--primary-colour)" />

    <p>Welcome to Project QWERTY!</p>

    <p>Project QWERTY is a <strong>free</strong> therapy website for people with <strong>aphasia</strong> that targets spelling and typing.  It can be used on a tablet or desktop.</p>

    <p>Aphasia is a <strong>neurological disorder</strong> and <strong>communication disability</strong> which can affect talking, understanding, reading, writing and numeracy. Causes for aphasia include stroke, brain tumour or brain injury. It can have a significant impact on all areas of a person's quality of life.</p>

    <IconHeader :major="true" text="FAQs" icon="circle-question" iconColour="var(--primary-colour)" />

    <CollapsibleSection summary="What is Project QWERTY?" class="faint-border-bottom">
      <p>Project QWERTY is a free therapy website for people with aphasia. It targets <strong>spelling</strong> and <strong>typing</strong> with the option of accessing everyday words via the pre-programmed categories or by creating custom categories.</p>
    </CollapsibleSection>

    <CollapsibleSection summary="What are custom categories?" class="faint-border-bottom">
      <p>You can create <strong>personalised</strong> categories to practise words and phrases that are important and meaningful to <strong>you</strong>.</p>
    </CollapsibleSection>

    <CollapsibleSection summary="How do I access the website?" class="faint-border-bottom">
      <p>You can access Project QWERTY on a <strong>tablet</strong>, <strong>mobile phone</strong>, or <strong>desktop computer</strong>, however, the website is optimised for use on <strong>tablets</strong>.</p>

      <p>If you are accessing Project QWERTY on a desktop computer, use your <strong>mouse</strong> to click on each letter. Your physical keyboard will not work.</p>
    </CollapsibleSection>

    <CollapsibleSection summary="How do I save my word list so that I can practice my custom categories on different devices?" class="faint-border-bottom">
      <ol>
        <li>Tap ‘Customise’ in the left-hand menu</li>
        <li>Tap on the category you wish to save</li>
        <li>Tap on the 3 dots on the right-hand side of the page</li>
        <li>Tap ‘Export category’ and the words in your custom category will be downloaded as a file to your device</li>
        <li>Transfer this file to your other device (e.g. via email, USB or the cloud)</li>
        <li>Open <a href="https://projectqwerty.com">projectqwerty.com</a> on your other device</li>
        <li>Tap ‘Customise’ in the left-hand menu</li>
        <li>Tap on the 3 dots on the right-hand side of the page</li>
        <li>Tap ‘Import category’</li>
        <li>Select your file from the pop-up window</li>
      </ol>
    </CollapsibleSection>

    <CollapsibleSection summary="If I add my personal details to a custom category, how do I know that they are safe?" class="faint-border-bottom">
      <p>All of the data that you enter into Project QWERTY remains strictly <strong>on your device</strong>.</p>

      <p>It <strong>never</strong> goes to any external systems, and is <strong>never</strong> shared with the Project QWERTY team or anyone else.</p>

      <p><strong>Only you</strong> have access to it.</p>

      <p>This can be <strong>verified</strong> by checking Project QWERTY's source code. See the FAQ on "<strong>open source</strong>" for more details.</p>
    </CollapsibleSection>

    <CollapsibleSection summary="Who created Project QWERTY?" class="faint-border-bottom">
      <p>Project QWERTY has been made with the support of people with aphasia, a team of Speech Pathologists from Monash Health, a team of students from Monash University, and some volunteers.</p>

      <p>Credits are as follows:</p>

      <ul>
        <li>Our clients with aphasia</li>
        <li>Jenny Walsh - Senior Speech Pathologist, Monash Health</li>
        <li>Grace Schofield - Speech Pathologist, Monash Health</li>
        <li>Benjamin Smith - Business Intelligence Analyst, Monash Health</li>
        <li>Dr Abby Foster - Allied Health Research Adviser, Monash Health</li>
        <li>Dr Caroline Baker - Research and Clinical Practice Lead, Monash Health</li>
        <li>William Holt - Programmer (volunteer)</li>
        <li>Tim Harris - Programmer, Monash University HISS participant</li>
        <li>Eliza Cripps - Project Co-coordinator, Monash University HISS participant</li>
        <li>Rob Angelone - User Experience Design (volunteer)</li>
      </ul>
    </CollapsibleSection>

    <CollapsibleSection summary="How can I contact the Project QWERTY team?" class="faint-border-bottom">
      <p>You can email us at <a href="mailto:projectqwerty2020@gmail.com">projectqwerty2020@gmail.com</a>. We'd love to hear from you!</p>

      <p>Let us know about your experience with the app, any comments or suggestions you might have, or if you think you've found a problem with the website.</p>
    </CollapsibleSection>

    <CollapsibleSection summary="Project QWERTY is &quot;open source&quot;? What does that mean?" class="faint-border-bottom">
      <p>Yes, Project QWERTY is <strong>open source</strong>. This means that the code that runs the website is publicly viewable. We keep it here: <a href="https://github.com/project-qwerty/project-qwerty">https://github.com/project-qwerty/project-qwerty</a>, and anyone (including you) can take a look at it to see how Project QWERTY works.</p>

      <p>This transparency means that you can be confident that Project QWERTY is <strong>safe to use</strong>, and that your personal data is kept secure.</p>

      <p>It also ensures that Project QWERTY is, and always will be, <strong>free for everyone</strong> to use.</p>
    </CollapsibleSection>
  </Nav>
</template>


<script>
import Nav from '@/components/Nav.vue';
import CollapsibleSection from '@/components/CollapsibleSection.vue';
import IconHeader from '@/components/IconHeader.vue';

export default {
  components: {
    Nav,
    CollapsibleSection,
    IconHeader,
  },
}
</script>


<style scoped>

</style>
