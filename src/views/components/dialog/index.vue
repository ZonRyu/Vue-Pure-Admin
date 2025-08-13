<script setup lang="tsx">
import { useRouter } from "vue-router";
import { h, createVNode, ref } from "vue";
import { message } from "@/utils/message";
import formPrimitive from "./formPrimitive.vue";
import forms, { type FormProps } from "./form.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import {
  addDialog,
  closeDialog,
  updateDialog,
  closeAllDialog
} from "@/components/ReDialog";

defineOptions({
  name: "DialogPage"
});

const router = useRouter();

function onBaseClick() {
  addDialog({
    title: "Basic usage",
    contentRenderer: () => <p>Dialog content - Basic usage</p> // jsx syntax (note that in .vue files, enable jsx syntax, need to open lang="tsx" in script)
  });
}

function onDraggableClick() {
  addDialog({
    title: "Draggable",
    draggable: true,
    contentRenderer: () => h("p", "Dialog content - Draggable") // h render function https://cn.vuejs.org/api/render-function.html#h
  });
}

function onFullscreenClick() {
  addDialog({
    title: "Fullscreen",
    fullscreen: true,
    contentRenderer: () => createVNode("p", null, "Dialog content - Fullscreen") // createVNode render function https://cn.vuejs.org/guide/extras/render-function.html#creating-vnodes
  });
}

function onFullscreenIconClick() {
  addDialog({
    title: "Fullscreen Button and Events",
    fullscreenIcon: true,
    fullscreenCallBack: ({ options, index }) =>
      message(options.fullscreen ? "Fullscreen" : "Exit Fullscreen"),
    contentRenderer: () => <p>Dialog content - Fullscreen button and events</p>
  });
}

function onModalClick() {
  addDialog({
    title: "No Background Mask",
    modal: false,
    contentRenderer: () => <p>Dialog content - No background mask</p>
  });
}

function onStyleClick() {
  addDialog({
    title: "Custom Position",
    top: "60vh",
    style: { marginRight: "20px" },
    contentRenderer: () => <p>Dialog content - Custom position</p>
  });
}

// Add 600ms debounce
const onoOpenDelayClick = debounce(
  () =>
    addDialog({
      title: "Delay 2 seconds to open dialog",
      openDelay: 2000 - 600,
      contentRenderer: () => <p>Dialog content - Delay 2 seconds to open dialog</p>
    }),
  600
);

function onCloseDelayClick() {
  addDialog({
    title: "Delay 2 seconds to close dialog",
    closeDelay: 2000,
    contentRenderer: () => <p>Dialog content - Delay 2 seconds to close dialog</p>
  });
}

function onShowCloseClick() {
  addDialog({
    title: "Do not display the close button icon in the upper right corner",
    showClose: false,
    contentRenderer: () => <p>Dialog content - Do not display the close button icon in the upper right corner</p>
  });
}

function onBeforeCloseClick() {
  addDialog({
    title: "Prohibited from closing through keyboard ESC",
    closeOnPressEscape: false,
    contentRenderer: () => <p>Dialog content - Prohibited from closing through keyboard ESC</p>
  });
}

function onCloseOnClickModalClick() {
  addDialog({
    title: "Prohibited from closing through clicking modal",
    closeOnClickModal: false,
    contentRenderer: () => <p>Dialog content - Prohibited from closing through clicking modal</p>
  });
}

function onHideFooterClick() {
  addDialog({
    title: "Hide bottom cancel, confirm buttons",
    hideFooter: true,
    contentRenderer: () => <p>Dialog content - Hide bottom cancel, confirm buttons</p>
  });
}

function onHeaderRendererClick() {
  addDialog({
    title: "Custom header",
    showClose: false,
    headerRenderer: ({ close, titleId, titleClass }) => (
      // jsx syntax
      <div class="flex flex-row justify-between">
        <h4 id={titleId} class={titleClass}>
          Custom header
        </h4>
        <el-button type="danger" onClick={close}>
          Close
        </el-button>
      </div>
    ),
    contentRenderer: () => <p>Dialog content - Custom header</p>
  });
}

function onFooterRendererClick() {
  addDialog({
    title: "Custom footer",
    footerRenderer: ({ options, index }) => (
      <el-button onClick={() => closeDialog(options, index)}>
        {options.title}-{index}
      </el-button>
    ),
    contentRenderer: () => <p>Dialog content - Custom footer</p>
  });
}

function onFooterButtonsClick() {
  addDialog({
    title: "Custom footer buttons",
    footerButtons: [
      {
        label: "Button 1",
        size: "small",
        type: "success",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "Button 2",
        text: true,
        bg: true,
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      },
      {
        label: "Button 3",
        size: "large",
        type: "warning",
        btnClick: ({ dialog: { options, index }, button }) => {
          console.log(options, index, button);
          closeDialog(options, index);
        }
      }
    ],
    contentRenderer: () => <p>Dialog content - Custom footer buttons</p>
  });
}

function onOpenClick() {
  addDialog({
    title: "Open callback",
    open: ({ options, index }) => message({ options, index } as any),
    contentRenderer: () => <p>Dialog content - Open callback</p>
  });
}

function onCloseCallBackClick() {
  addDialog({
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
    contentRenderer: () => <p>Dialog content - Close callback</p>
  });
}

// For the convenience of demonstration, we used nested writing, but in actual situations, it is best to extract the addDialog function. Nesting is not recommended
function onNestingClick() {
  addDialog({
    title: "Nested dialog",
    contentRenderer: ({ index }) => (
      <el-button
        onClick={() =>
          addDialog({
            title: `The ${index + 1}th bullet dialog`,
            width: "40%",
            contentRenderer: ({ index }) => (
              <el-button
                onClick={() =>
                  addDialog({
                    title: `The ${index + 1}th bullet dialog`,
                    width: "30%",
                    contentRenderer: () => (
                      <>
                        <el-button round onClick={() => closeAllDialog()}>
                          Oh, you're doing it, quickly close all dialogs
                        </el-button>
                      </>
                    )
                  })
                }
              >
                Click to open the {index + 1}th bullet dialog
              </el-button>
            )
          })
        }
      >
        Click to open the {index + 1}th bullet dialog
      </el-button>
    )
  });
}

// Satisfy the scenario of changing the dialog's own attribute value in the contentRenderer content area
function onUpdateClick() {
  const curPage = ref(1);
  addDialog({
    title: `The ${curPage.value}th page`,
    contentRenderer: () => (
      <>
        <el-button
          disabled={curPage.value > 1 ? false : true}
          onClick={() => {
            curPage.value -= 1;
            updateDialog(`The ${curPage.value}th page`);
          }}
        >
          Previous page
        </el-button>
        <el-button
          onClick={() => {
            curPage.value += 1;
            updateDialog(`The ${curPage.value}th page`);
          }}
        >
          Next page
        </el-button>
      </>
    )
  });
}

// Popconfirm confirmation box
function onPopconfirmClick() {
  addDialog({
    width: "30%",
    title: "Popconfirm confirmation box example",
    popconfirm: { title: "Confirm modification of current data" },
    contentRenderer: () => <p>Click the confirm button below to see the effect</p>
  });
}

// Combine Form form (first way, the dialog closes immediately and restores the initial value) receive the prop of the child component and assign it
function onFormOneClick() {
  addDialog({
    width: "30%",
    title: "Combine Form form (first way, the dialog closes immediately and restores the initial value)",
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
        message(`You clicked the cancel button, the current form data is ${text}`);
      } else if (args?.command === "sure") {
        message(`You clicked the sure button, the current form data is ${text}`);
      } else {
        message(
          `You clicked the right upper corner close button or blank page or pressed esc key, the current form data is ${text}`
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
  addDialog({
    width: "30%",
    title: "Combine Form form (second way, h rendering function)",
    contentRenderer: () =>
      h(forms, {
        formInline: formInline.value
      }),
    closeCallBack: () => {
      message(
        `The current form data is Name: ${formInline.value.user} City: ${formInline.value.region}`
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
  addDialog({
    width: "30%",
    title: "Combine Form form (third way, createVNode rendering function)",
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: () => {
      message(
        `The current form data is Name: ${formThreeInline.value.user} City: ${formThreeInline.value.region}`
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
  region: "浙江"
});
const resetFormFourInline = cloneDeep(formFourInline.value);
function onFormFourClick() {
  addDialog({
    width: "30%",
    title: "Combine Form form (fourth way, jsx syntax)",
    contentRenderer: () => <forms formInline={formFourInline.value} />,
    closeCallBack: () => {
      message(
        `The current form data is Name: ${formFourInline.value.user} City: ${formFourInline.value.region}`
      );
      // Reset form data
      formFourInline.value = cloneDeep(resetFormFourInline);
    }
  });
}

// 子组件 prop 为 primitive 类型的 demo
const formPrimitiveParam = ref("Hello World");
const resetFormPrimitiveParam = ref(formPrimitiveParam.value);
function onFormPrimitiveFormClick() {
  addDialog({
    width: "30%",
    title: "Subcomponent prop is primitive type demo",
    contentRenderer: () =>
      h(formPrimitive, {
        data: formPrimitiveParam.value,
        "onUpdate:data": val => (formPrimitiveParam.value = val)
      }),
    closeCallBack: () => {
      message(`The current form content: ${formPrimitiveParam.value}`);
      // Reset form data
      formPrimitiveParam.value = resetFormPrimitiveParam.value;
    }
  });
}

function onBeforeCancelClick() {
  addDialog({
    title: "Click the bottom cancel button callback",
    contentRenderer: () => (
      <p>Dialog content - Click the bottom cancel button callback (will pause the closing of the dialog)</p>
    ),
    beforeCancel: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要关闭把注释解开即可
    }
  });
}

function onBeforeSureClick() {
  addDialog({
    title: "Click the bottom sure button callback",
    contentRenderer: () => (
      <p>
        Dialog content - Click the bottom sure button callback (will pause the closing of the dialog, often used for calling the interface after adding or modifying the dialog content)
      </p>
    ),
    beforeSure: (done, { options, index }) => {
      console.log(
        "%coptions, index===>>>: ",
        "color: MidnightBlue; background: Aquamarine; font-size: 20px;",
        options,
        index
      );
      // done(); // 需要关闭把注释解开即可
    }
  });
}

function onSureBtnLoading() {
  addDialog({
    sureBtnLoading: true,
    title: "Click the bottom sure button to enable button animation",
    contentRenderer: () => <p>Dialog content - Click the bottom sure button to enable button animation</p>,
    beforeSure: (done, { closeLoading }) => {
      // closeLoading() // Close the button animation, do not close the dialog
      // done() // Close the button animation and close the dialog
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
          Secondary encapsulation of Element Plus's
          <el-link
            href="https://element-plus.org/zh-CN/component/dialog.html"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            Dialog
          </el-link>
          , using functional dialog component calls (for more examples, please refer to 
          <span
            class="cursor-pointer text-primary"
            @click="router.push({ name: 'SystemDept' })"
          >
            System Management Page
          </span>
          ）
        </span>
      </div>
      <el-link
        href="https://github.com/pure-admin/vue-pure-admin/tree/main/src/views/components/dialog"
        target="_blank"
      >
        Code location: src/views/components/dialog
      </el-link>
    </template>
    <el-space wrap>
      <el-button @click="onBaseClick"> Basic Usage </el-button>
      <el-button @click="onDraggableClick"> Draggable </el-button>
      <el-button @click="onFullscreenClick"> Fullscreen </el-button>
      <el-button @click="onFullscreenIconClick"> Fullscreen Button & Events </el-button>
      <el-button @click="onModalClick"> No Background Mask </el-button>
      <el-button @click="onStyleClick"> Custom Position </el-button>
      <el-button @click="onoOpenDelayClick"> Open with Delay (2s) </el-button>
      <el-button @click="onCloseDelayClick"> Close with Delay (2s) </el-button>
      <el-button @click="onShowCloseClick">
        Hide Close Button
      </el-button>
      <el-button @click="onBeforeCloseClick"> Disable ESC Key </el-button>
      <el-button @click="onCloseOnClickModalClick">
        Disable Click Outside
      </el-button>
      <el-button @click="onHideFooterClick"> Hide Footer Buttons </el-button>
      <el-button @click="onHeaderRendererClick"> Custom Header </el-button>
      <el-button @click="onFooterRendererClick"> Custom Footer </el-button>
      <el-button @click="onFooterButtonsClick"> Custom Footer Buttons </el-button>
      <el-button @click="onOpenClick"> Open Callback </el-button>
      <el-button @click="onCloseCallBackClick"> Close Callback </el-button>
      <el-button @click="onNestingClick"> Nested Dialogs </el-button>
      <el-button @click="onUpdateClick"> Update Properties </el-button>
      <el-button @click="onPopconfirmClick"> Popconfirm Dialog </el-button>
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
        Primitive Prop
      </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button @click="onBeforeCancelClick">
        Before Cancel Callback
      </el-button>
      <el-button @click="onBeforeSureClick">
        Before Confirm Callback
      </el-button>
      <el-button @click="onSureBtnLoading">
        Button Loading State
      </el-button>
    </el-space>
  </el-card>
</template>
