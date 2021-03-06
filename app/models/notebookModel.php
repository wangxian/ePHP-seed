<?php
class notebookModel extends model
{
	/**
	 * list notebook
	 * @param int $page
	 * @param int $pagecount
	 */
	public function list_note($page,$pagecount=10)
	{
		return $this->table('t_notebook')->orderby('id desc')
					->limit( $pagecount*($page-1), $pagecount )
			 		->findPage();
	}

	public function add_note($data)
	{
		return $this->table('t_notebook')->set( $data )->insert();
	}

	public function update_note($id,$data)
	{
		return $this->table('t_notebook')->set( $data )->where("id='{$id}'")->update();
	}

	public function del_note($id)
	{
		return $this->table('t_notebook')->where("id='{$id}'")->delete();
	}

	public function note_info($id)
	{
		return $this->table('t_notebook')->where("id='{$id}'")->find();
	}
}