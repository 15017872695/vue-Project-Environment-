

<style scoped lang="scss" rel="stylesheet/scss">
.tool-bar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  top: 1px;
  left: 0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  border-top: 1p solid #000;
  .tool-box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex: 1 1 auto;
    z-index: 10;
      &.left {
        justify-content: flex-start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: flex-end;
      }
      .tool-item {
        display: inline-block;
      }
      .divider {
        height: "100%";
      }
    
  }
}
</style>

<template>
  <div class="tool-bar" :style="toolBarStyle">
    <Handler
      class="handler"
      mode="horizontal"
      position="bottom"
      :expand="isExpand"
      :callback="toggleHandler"
    ></Handler>
    <template v-for="(type, typeIndex) in Object.keys(toolMap)">
      <ToolBox mode="horizontal" :key="typeIndex" :class="type">
        <template v-for="(item, index) in toolMap[type]">
          <ToolItem
            v-if="item.type === 'text'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item)"
          >
            <template v-slot:label>
              <Icon type="arrow-down-a"></Icon>
              <XIcon v-if="item.icon" :type="item.icon"></XIcon>
              <span v-else>{{ $t(item.lang) }}</span>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'dropdown-color-picker'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
          >
            <template v-slot:label>
              <template v-if="item.disabled">
                <div style="margin: 0 3px;">
                  <XIcon :type="item.icon" style="vertical-align: middle;"></XIcon>
                  <Icon type="ios-arrow-down"></Icon>
                </div>
              </template>
              <template v-else>
                <Dropdown
                  trigger="click"
                  @on-click="(val) => handleDropdownClick(item, type, index, val)"
                >
                  <div style="margin: 0 3px;">
                    <XIcon :type="item.icon" style="vertical-align: middle;"></XIcon>
                    <Icon type="ios-arrow-down"></Icon>
                  </div>
                  <SketchPicker
                    slot="list"
                    :value="formData[item.name]"
                    @input="(val) => handleToolClick(item, val, null)"
                  ></SketchPicker>
                </Dropdown>
              </template>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'dropdown-list'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
          >
            <template v-slot:label>
              <template v-if="item.disabled">
                <div style="margin: 0 3px;">
                  <template v-if="item.lockLabel">
                    <XIcon :type="item.icon" style="vertical-align: middle;"></XIcon>
                  </template>
                  <template v-else>
                    <XIcon
                      v-if="item.children[item.selected].icon"
                      :type="item.children[item.selected].icon"
                      style="vertical-align: middle;"
                      :style="item.children[item.selected].style"
                    ></XIcon>
                    <span v-else>{{ item.children[item.selected].label }}</span>
                  </template>
                  <!-- <Icon type="ios-arrow-down"></Icon> -->
                  <i class="el-icon-arrow-down"></i>
                </div>
              </template>
              <template v-else>
                <Dropdown
                  trigger="click"
                  @on-click="(val) => handleDropdownClick(item, type, index, val)"
                >
                  <div style="margin: 0 3px;">
                    <template v-if="item.lockLabel">
                      <XIcon :type="item.icon" style="vertical-align: middle;"></XIcon>
                      <!-- <i :class="item.icon"></i> -->
                    </template>
                    <template v-else>
                      <XIcon
                        v-if="item.children[item.selected].icon"
                        :type="item.children[item.selected].icon"
                        style="vertical-align: middle;"
                        :style="item.children[item.selected].style"
                      ></XIcon>
                      <span v-else>{{ item.children[item.selected].label }}</span>
                    </template>
                    <!-- <Icon type="ios-arrow-down"></Icon> -->
                    <!-- <i class="el-icon-arrow-down"></i> -->
                  </div>
                  <DropdownMenu slot="list">
                    <DropdownItem
                      v-for="(child, childIndex) in item.children"
                      :key="childIndex"
                      :name="childIndex"
                      :disabled="child.disabled"
                      :divided="child.divided"
                      :selected="item.selected === childIndex"
                    >
                      <template v-if="child.icon">
                        <XIcon :type="child.icon" :title="$t(child.lang)" :style="child.style"></XIcon>
                      </template>
                      <template v-else>
                        <span>{{ child.lang ? $t(child.lang) : child.label }}</span>
                      </template>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'link'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item)"
          >
            <template v-slot:label>
              <a :href="item.link" target="_blank" style="color: #333333;">
                <XIcon v-if="item.icon" :type="item.icon"></XIcon>
                <span v-else>{{ $t(item.lang) }}</span>
              </a>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'normal'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item)"
          >
            <template v-slot:label>
              <XIcon v-if="item.icon" :type="item.icon"></XIcon>
              <span v-else>{{ $t(item.lang) }}</span>
            </template>
          </ToolItem>
          <XDivider
            class="divider"
            v-if="item.toolbar.divider"
            :key="'tool_' + type + '_divider_' + index"
            mode="vertical"
          />
        </template>
      </ToolBox>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Handler from "../components/Handler";
import ToolBox from "../../ToolBox/Index";
import ToolItem from "../../ToolBox/ToolItem";
import config from "../config/index";
export default {
  name: "ToolBar",
  components: {
    Handler,
    ToolBox,
    ToolItem
  },
  data() {
    return {
      formData: {
        ...config.$X
      },
      // 是否展开
      isExpand: true
    };
  },
  computed: {
    ...mapGetters(["currentItem", "toolList"]),
    toolBarStyle() {
      let _t = this;
      let style = {};
      // 处理展开
      if (_t.isExpand) {
        style.top = 0;
      } else {
        style.top = "-40px";
      }
      return style;
    },
    toolMap() {
      let _t = this;
      let toolMap = {};
      console.log(_t.toolList);
      _t.toolList.forEach(item => {
        if (item.enable && item.toolbar && item.toolbar.enable) {
          let position = item.toolbar.position;
          if (!toolMap.hasOwnProperty(position)) {
            toolMap[position] = [];
          }
          toolMap[position].push(item);
        }
      });
      return toolMap;
    }
  },
  mounted() {
    console.log(this);
  },
  methods: {
    toggleHandler(val) {
      let _t = this;
      _t.isExpand = val !== undefined ? val : !_t.isExpand;
    },
    handleDropdownClick(item, type, index, val) {
      let _t = this;
      console.log("handleDropdownClick", item.name);
      if (item.disabled) {
        return;
      }
      let child = item.children[val];
      _t.formData[item.name] = child.name;
      let payload = {
        context: "ToolBar",
        event: event,
        name: item.name
      };
      switch (item.name) {
        case "lineWidth":
        case "lineType":
        case "lineStyle":
        case "download":
          payload = {
            ...payload,
            data: child.name
          };
          break;
        case "zoom":
        case "startArrow":
        case "endArrow":
          payload = {
            ...payload,
            data: child.data
          };
          break;
        case "language":
          // 更新cookie
          console.log(_t.$X.config)
          let cookieKey = _t.$X.config.cookie.getItem("locale");
          _t.$X.Cookies.set(cookieKey, child.name, {
            expires: 7,
            path: _t.$X.config.cookie.path
          });
          _t.$i18n.locale = _t.$X.langs.locale = child.name;
          break;
      }
      _t.$X.utils.bus.$emit("editor/tool/trigger", payload);
      // 处理选中，更新toolList
      let toolList;
      toolList = _t.toolList.map(target => {
        if (target.name === item.name) {
          target.selected = val;
        }
        return target;
      });
      _t.$store.commit("editor/toolList/update", toolList);
    },
    handleToolClick(item, val) {
      let _t = this;
      console.log("handleToolClick", item.name);
      if (item.disabled) {
        return;
      }
      console.log("MaterialsEditor tool click", item.name, val);
      let payload = {
        context: "ToolBar",
        name: item.name
      };
      switch (item.name) {
        case "fill":
        case "lineColor":
          let color = val.hex8;
          _t.formData[item.name] = color;
          payload = {
            ...payload,
            data: color
          };
          break;
        case "toFront":
        case "toBack":
          payload = {
            ...payload,
            data: _t.currentItem
          };
          break;
      }
      _t.$X.utils.bus.$emit("editor/tool/trigger", payload);
    }
  },
  created() {
    let _t = this;
    _t.$X.utils.bus.$on("editor/pad/dblclick", _t.toggleHandler);
  }
};
</script>
