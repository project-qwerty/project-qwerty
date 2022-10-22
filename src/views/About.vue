<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">

      <div class="about-wrapper">

        <div class="header-wrapper">
          <div class="header">
            <IconHeader :major="true" text="About" icon="circle-info" iconColour="var(--primary-colour)" />
          </div>

          <div class="about">
            <p>Welcome to Project QWERTY!</p>
            <p>Project QWERTY is a <strong>free</strong> therapy website for people with <strong>aphasia</strong> that targets spelling and typing.  It can be used on a tablet or desktop.</p>
            <p>Aphasia is a <strong>neurological disorder</strong> and <strong>communication disability</strong> which can affect talking, understanding, reading, writing and numeracy. Causes for aphasia include stroke, brain tumour or brain injury. It can have a significant impact on all areas of a person's quality of life.</p>
          </div>
        </div>

        <div class="header-wrapper">
          <div class="header">
            <IconHeader :major="true" text="FAQs" icon="circle-question" iconColour="var(--primary-colour)" />
          </div>
        </div>

        <div class="faq-item-wrapper border-top">
          <div class="faq-item">
            <CollapsibleSection summary="What is Project QWERTY?" >
              <p>Project QWERTY is a free therapy website for people with aphasia. It targets <strong>spelling</strong> and <strong>typing</strong> with the option of accessing everyday words via the pre-programmed categories or by creating custom categories.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="What are custom categories?" >
              <p>You can create <strong>personalised</strong> categories to practise words and phrases that are important and meaningful to <strong>you</strong>.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="How do I access the website?" >
              <p>You can access Project QWERTY on a <strong>tablet</strong> or a <strong>desktop computer</strong>, however, the website is optimised for use on tablets.</p>
              <p>If you are accessing Project QWERTY on a desktop computer, use your <strong>mouse</strong> to click on each letter. Your physical keyboard will not work.</p>
            </CollapsibleSection>
          </div>
        </div>


        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="My keyboard is not working on my desktop computer. What should I do?" >
              <p>For <strong>desktop computer</strong> users: <strong>use your mouse</strong> to click on each letter. The physical keyboard will not work.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="I can't see the full page on my tablet. What should I do?" >
              <p>View the website in <strong>landscape</strong>. You may need to adjust your settings so that the page can rotate.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="How do I save my word list so that I can practice my custom categories on different devices?" >
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
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="If I add my personal details to a custom category, how do I know that they are safe?" >
              <p>Your custom categories are always kept <strong>on your device</strong>. They are <strong>never</strong> shared with the Project QWERTY team or anyone else.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="How can I contact the Project QWERTY team?" >
              <p>You can email us at <a href="mailto:projectqwerty2020@gmail.com">projectqwerty2020@gmail.com</a>. We'd love to hear from you!</p>
              <p>Let us know about your experience with the app, any comments or suggestions you might have, or if you think you've found a problem with the website.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="Open Source" >
              <p>Project QWERTY is <strong>open source</strong> software. The source code is available on <a href="https://github.com/project-qwerty/project-qwerty">GitHub</a>.</p>
            </CollapsibleSection>
          </div>
        </div>

        <div class="faq-item-wrapper">
          <div class="faq-item">
            <CollapsibleSection summary="Credits" >
              <p>Project QWERTY has been made with the support of people with aphasia, a team of Speech Pathologists from Monash Health, a team of students from Monash University and some volunteers.</p>

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
          </div>
        </div>

      </div>

    </div>
  </div>
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
  .about {
    margin-bottom: var(--margin-vertical);
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .about-wrapper {
    max-width: 900px;
  }

  .faq-item-wrapper {
    border-bottom: solid 1px var(--faint-colour);
    margin: 0px 1rem;
  }

  .header {
    display: flex;
    margin: 0px 1rem 2rem 1rem;
  }

  @media (min-width: 600px) {
    .about-wrapper {
      margin: 0px 2rem;
    }
  }

  @media (min-width: 800px) {
    .about-wrapper {
      margin: 0px 3rem;
    }
  }
</style>
