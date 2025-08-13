<script setup lang="tsx">
import {
  addDrawer,
  closeDrawer,
  closeAllDrawer,
  updateDrawer
} from "@/components/ReDrawer/index";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { message } from "@/utils/message";
import { createVNode, h, ref } from "vue";
import formPrimitive from "./formPrimitive.vue";
import forms, { type FormProps } from "./form.vue";

function onBaseClick() {
  addDrawer({
    title: "Basic Usage",
    contentRenderer: () => <p>Drawer content - Basic Usage</p> // jsx 语法 （注意在.vue文件启用jsx语法，需要在script开启lang="tsx"）
  });
}

function onModalClick() {
  addDrawer({
    title: "Without background mask layer",
    modal: false,
    contentRenderer: () => <p>Drawer content - Without background mask layer</p>
  });
}

// Add 600ms debounce
const onoOpenDelayClick = debounce(
  () =>
    addDrawer({
      title: "Delay 2 seconds to open drawer",
      openDelay: 2000 - 600,
      contentRenderer: () => <p>Drawer content - Delay 2 seconds to open drawer</p>
    }),
  600
);

function onCloseDelayClick() {
  addDrawer({
    title: "Delay 2 seconds to close drawer",
    closeDelay: 2000,
    contentRenderer: () => <p>Drawer content - Delay 2 seconds to close drawer</p>
  });
}

function onShowCloseClick() {
  addDrawer({
    title: "Do not display the close button icon in the upper right corner",
    showClose: false,
    contentRenderer: () => <p>Drawer content - Do not display the close button icon in the upper right corner</p>
  });
}

function onBeforeCloseClick() {
  addDrawer({
    title: "Prohibited from closing through keyboard ESC",
    closeOnPressEscape: false,
    contentRenderer: () => <p>Drawer content - Prohibited from closing through keyboard ESC</p>
  });
}

function onCloseOnClickModalClick() {
  addDrawer({
    title: "Prohibited from closing through clicking modal",
    closeOnClickModal: false,
    contentRenderer: () => <p>Drawer content - Prohibited from closing through clicking modal</p>
  });
}

function onHideFooterClick() {
  addDrawer({
    title: "Hide bottom cancel, confirm buttons",
    hideFooter: true,
    contentRenderer: () => <p>Drawer content - Hide bottom cancel, confirm buttons</p>
  });
}

function onHeaderRendererClick() {
  addDrawer({
    title: "Custom header",
    showClose: false,
    headerRenderer: ({ close, titleId, titleClass }) => (
      // jsx syntax
      <div class="flex flex-row justify-between">
        <h4 id={titleId} class={titleClass}>
          Custom header
        </h4>
        <el-button type="danger" onClick={close}>
          关闭
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>Drawer content - Custom header</p>
  });
}

function onFooterRendererClick() {
  addDrawer({
    title: "Custom footer",
    footerRenderer: ({ options, index }) => (
      <el-button onClick={() => closeDrawer(options, index)}>
        {options.title}-{index}
      </el-button>
    ),
    contentRenderer: () => <p>Drawer content - Custom footer</p>
  });
}

function onFooterButtonsClick() {
  addDrawer({
    title: "Custom footer buttons",
    footerButtons: [
      {
        label: "Button 1",
        size: "small",
        type: "success",
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      },
      {
        label: "Button 2",
        text: true,
        bg: true,
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      },
      {
        label: "Button 3",
        size: "large",
        type: "warning",
        btnClick: ({ drawer: { options, index }, button }) => {
          console.log(options, index, button);
          closeDrawer(options, index);
        }
      }
    ],
    contentRenderer: () => <p>Drawer content - Custom footer buttons</p>
  });
}

function onOpenClick() {
  addDrawer({
    title: "Open callback",
    open: ({ options, index }) => message({ options, index } as any),
    contentRenderer: () => <p>Drawer content - Open callback</p>
  });
}

function onCloseCallBackClick() {
  addDrawer({
    title: "Close callback",
    closeCallBack: ({ options, index, args }) => {
      console.log(options, index, args);
      let text = "";
      if (args?.command === "cancel") {
        text = "You clicked the cancel button";
      } else if (args?.command === "sure") {
        text = "You clicked the sure button";
      } else {
        text = "You clicked the right upper corner close button or blank page or pressed esc key";
      }
      message(text);
    },
    contentRenderer: () => <p>Drawer content - Close callback</p>
  });
}

// For the convenience of demonstration, we used nested writing, but in actual situations, it is best to extract the addDrawer function. Nesting is not recommended
function onNestingClick() {
  addDrawer({
    title: "Nested drawer",
    size: "50%",
    contentRenderer: ({ index }) => (
      <el-button
        onClick={() =>
          addDrawer({
            title: `The ${index + 1}th child drawer`,
            size: "40%",
            contentRenderer: ({ index }) => (
              <el-button
                onClick={() =>
                  addDrawer({
                    title: `The ${index + 1}th child drawer`,
                    size: "30%",
                    contentRenderer: () => (
                      <>
                        <el-button round onClick={() => closeAllDrawer()}>
                          Oh my god, what are you doing, quickly close all drawers
                        </el-button>
                      </>
                    )
                  })
                }
              >
                Click to open the {index + 1}th child drawer
              </el-button>
            )
          })
        }
      >
        Click to open the {index + 1}th child drawer
      </el-button>
    )
  });
}

//满足 in contentRenderer content area to change the drawer's own attribute value
function onUpdateClick() {
  const curPage = ref(1);
  addDrawer({
    title: `Page ${curPage.value}`,
    contentRenderer: () => (
      <>
        <el-button
          disabled={curPage.value <= 1}
          onClick={() => {
            curPage.value -= 1;
            updateDrawer(`Page ${curPage.value}`);
          }}
        >
          Previous page
        </el-button>
        <el-button
          onClick={() => {
            curPage.value += 1;
            updateDrawer(`Page ${curPage.value}`);
          }}
        >
          Next page
        </el-button>
      </>
    )
  });
}

// Popconfirm confirmation box
function onPopConfirmClick() {
  addDrawer({
    size: "30%",
    title: "Popconfirm confirmation box example",
    popConfirm: { title: "Confirm modification of current data" },
    contentRenderer: () => <p>Click the confirm button below to see the effect</p>
  });
}

// Combine Form form (first way, the drawer closes immediately and restores the initial value) receive the prop of the child component and assign it
function onFormOneClick() {
  addDrawer({
    size: "30%",
    title: "Combine Form form (first way)",
    contentRenderer: () => forms,
    props: {
      // Assign default value
      formInline: {
        user: "Cai Xukun",
        region: "Zhejiang"
      }
    },
    closeCallBack: ({ options, args }) => {
      // options.props is reactive
      const { formInline } = options.props as FormProps;
      const text = `Name: ${formInline.user} City: ${formInline.region}`;
      if (args?.command === "cancel") {
        // You clicked the cancel button
        message(`You clicked the cancel button, current form data is ${text}`);
      } else if (args?.command === "sure") {
        message(`You clicked the sure button, current form data is ${text}`);
      } else {
        message(
          `You clicked the right upper corner close button or blank page or pressed esc key, current form data is ${text}`
        );
      }
    }
  });
}

// Combine Form form (second way, h rendering function) https://cn.vuejs.org/api/render-function.html#h
const formInline = ref({
  user: "Cai Xukun",
  region: "Zhejiang"
});
const resetFormInline = cloneDeep(formInline.value);
function onFormTwoClick() {
  addDrawer({
    size: "30%",
    title: "Combine Form form (second way)",
    contentRenderer: () =>
      h(forms, {
        formInline: formInline.value
      }),
    closeCallBack: () => {
      message(
        `Current form data is Name: ${formInline.value.user} City: ${formInline.value.region}`
      );
      // Reset form data
      formInline.value = cloneDeep(resetFormInline);
    }
  });
}

// Combine Form form (third way, createVNode rendering function) https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
const formThreeInline = ref({
  user: "Cai Xukun",
  region: "Zhejiang"
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);
function onFormThreeClick() {
  addDrawer({
    size: "30%",
    title: "Combine Form form (third way)",
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: () => {
      message(
        `Current form data is Name: ${formThreeInline.value.user} City: ${formThreeInline.value.region}`
      );
      // Reset form data
      formThreeInline.value = cloneDeep(resetFormThreeInline);
    }
  });
}

// Combine Form form (fourth way, jsx syntax)
// Note that if forms is not registered, here forms is registered because above contentRenderer: () => forms、h(forms) 、createVNode(createVNode) indirectly registered it
// If only using jsx syntax, as shown below `contentRenderer: () => <forms formInline={formFourInline.value} />` will not register the forms component, need to write forms in `script` at any position (best at the end)
// Similarly, if using `contentRenderer: () => <forms formInline={formFourInline.value} />` in tsx file, it will not register the forms component, need to write forms in return
const formFourInline = ref({
  user: "Cai Xukun",
  region: "Zhejiang"
});
const resetFormFourInline = cloneDeep(formFourInline.value);
function onFormFourClick() {
  addDrawer({
    size: "30%",
    title: "Combine Form form (fourth way)",
    contentRenderer: () => <forms formInline={formFourInline.value} />,
    closeCallBack: () => {
      message(
        `Current form data is Name: ${formFourInline.value.user} City: ${formFourInline.value.region}`
      );
      // Reset form data
      formFourInline.value = cloneDeep(resetFormFourInline);
    }
  });
}

// Subcomponent prop is primitive type demo
const formPrimitiveParam = ref("Hello World");
const resetFormPrimitiveParam = ref(formPrimitiveParam.value);
function onFormPrimitiveFormClick() {
  addDrawer({
    size: "30%",
    title: "Subcomponent prop is primitive type demo",
    contentRenderer: () =>
      h(formPrimitive, {
        data: formPrimitiveParam.value,
        "onUpdate:data": val => (formPrimitiveParam.value = val)
      }),
    closeCallBack: () => {
      message(`Current form content: ${formPrimitiveParam.value}`);
      // Reset form data
      formPrimitiveParam.value = resetFormPrimitiveParam.value;
    }
  });
}

function onBeforeCancelClick() {
  addDrawer({
    title: "Click the bottom cancel button callback",
    contentRenderer: () => (
      <p>Drawer content - Click the bottom cancel button callback (will pause the drawer's closing)</p>
    ),
    beforeCancel: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // To close, uncomment
    }
  });
}

function onBeforeSureClick() {
  addDrawer({
    title: "Click the bottom sure button callback",
    contentRenderer: () => (
      <p>
        Drawer content - Click the bottom sure button callback (will pause the drawer's closing, often used for calling interfaces after adding or modifying drawer content)
      </p>
    ),
    beforeSure: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // To close, uncomment
    }
  });
}

function onSureBtnLoading() {
  addDrawer({
    sureBtnLoading: true,
    title: "Click the bottom sure button to enable button animation",
    contentRenderer: () => <p>Drawer content - Click the bottom sure button to enable button animation</p>,
    beforeSure: (done, { closeLoading }) => {
      // closeLoading(); // Close the button animation, do not close the drawer
      // done() // Close the button animation and close the drawer
      setTimeout(() => done(), 800);
    }
  });
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
         Secondary encapsulation of Element Plus
          <el-link
            href="https://element-plus.org/zh-CN/component/drawer.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Drawer
          </el-link>
        </span>
      </div>
      <el-link
        href="https://github.com/pure-admin/vue-pure-admin/tree/main/src/views/components/drawer"
        target="_blank"
      >
        Code location src/views/components/drawer
      </el-link>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick">Basic usage</el-button>
      <el-button @click="onModalClick"> No background mask layer </el-button>
      <el-button @click="onoOpenDelayClick"> Delay 2 seconds to open drawer </el-button>
      <el-button @click="onCloseDelayClick"> Delay 2 seconds to close drawer </el-button>
      <el-button @click="onShowCloseClick">
        Do not display the close button icon in the upper right corner
      </el-button>
      <el-button @click="onBeforeCloseClick">Disable closing with ESC key</el-button>
      <el-button @click="onCloseOnClickModalClick">
        Disable closing by clicking modal
      </el-button>
      <el-button @click="onHideFooterClick">Hide bottom cancel/confirm buttons</el-button>
      <el-button @click="onHeaderRendererClick">Custom Header</el-button>
      <el-button @click="onFooterRendererClick">Custom Footer</el-button>
      <el-button @click="onFooterButtonsClick">Custom Footer Buttons</el-button>
      <el-button @click="onOpenClick">Open Callback</el-button>
      <el-button @click="onCloseCallBackClick">Close Callback</el-button>
      <el-button @click="onNestingClick">Nested Drawers</el-button>
      <el-button @click="onUpdateClick">Update Drawer Properties</el-button>
      <el-button @click="onPopConfirmClick">Popconfirm Dialog</el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onFormOneClick">
        With Form (Method 1)
      </el-button>
      <el-button @click="onFormTwoClick">
        With Form (Method 2)
      </el-button>
      <el-button @click="onFormThreeClick">
        With Form (Method 3)
      </el-button>
      <el-button @click="onFormFourClick">
        With Form (Method 4)
      </el-button>
      <el-button @click="onFormPrimitiveFormClick">
        Child Component with Primitive Prop
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onBeforeCancelClick">
        Click the bottom cancel button callback (will pause the drawer's closing)
      </el-button>
      <el-button @click="onBeforeSureClick">
        Click the bottom sure button callback (will pause the drawer's closing, often used for calling interfaces after adding or modifying drawer content)
      </el-button>
      <el-button @click="onSureBtnLoading">
        Click the bottom sure button to enable button animation
      </el-button>
    </el-space>
  </el-card>
</template>
